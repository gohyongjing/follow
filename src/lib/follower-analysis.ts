import JSZip from 'jszip';
import { ComparisonResult } from '@/types/follower-analysis';

export const extractFollowersAndFollowing = async (
  zipFile: File
): Promise<ComparisonResult> => {
  const zip = new JSZip();
  const zipContent = await zip.loadAsync(zipFile);

  let followers: string[] = [];
  let following: string[] = [];

  // Look for common file patterns in social media data exports
  const fileNames = Object.keys(zipContent.files);
  console.log('Files in ZIP:', fileNames);

  // Try to find followers and following files (including nested directories)
  const followersFile = fileNames.find(
    name =>
      (name.toLowerCase().includes('followers') ||
        name.toLowerCase().includes('follower')) &&
      name.endsWith('.json') &&
      !name.includes('__MACOSX') &&
      !name.includes('/._')
  );

  const followingFile = fileNames.find(
    name =>
      (name.toLowerCase().includes('following') ||
        name.toLowerCase().includes('follows')) &&
      name.endsWith('.json') &&
      !name.includes('__MACOSX') &&
      !name.includes('/._')
  );

  console.log('Found followers file:', followersFile);
  console.log('Found following file:', followingFile);

  if (followersFile) {
    const followersContent =
      await zipContent.files[followersFile].async('string');
    followers = parseUserList(followersContent);
    console.log(`Parsed ${followers.length} followers from ${followersFile}`);
  }

  if (followingFile) {
    const followingContent =
      await zipContent.files[followingFile].async('string');
    following = parseUserList(followingContent);
    console.log(`Parsed ${following.length} following from ${followingFile}`);
  }

  // If we couldn't find specific files, try to parse all JSON files
  if (followers.length === 0 || following.length === 0) {
    for (const fileName of fileNames) {
      if (
        fileName.endsWith('.json') &&
        !fileName.includes('__MACOSX') &&
        !fileName.includes('/._') &&
        !fileName.includes('.DS_Store')
      ) {
        try {
          console.log('Trying to parse file:', fileName);
          const content = await zipContent.files[fileName].async('string');
          const users = parseUserList(content);
          console.log(`Parsed ${users.length} users from ${fileName}`);

          // Try to determine if this is followers or following based on file name or content
          if (
            fileName.toLowerCase().includes('followers') ||
            fileName.toLowerCase().includes('follower')
          ) {
            followers = users;
          } else if (
            fileName.toLowerCase().includes('following') ||
            fileName.toLowerCase().includes('follows')
          ) {
            following = users;
          } else if (followers.length === 0) {
            // Assume first file is followers if we haven't found any yet
            followers = users;
          } else if (following.length === 0) {
            // Assume second file is following
            following = users;
          }
        } catch (error) {
          console.warn(`Could not parse file ${fileName}:`, error);
        }
      }
    }
  }

  // Calculate comparison results
  const notFollowingBack = followers.filter(
    follower => !following.includes(follower)
  );
  const notFollowedBack = following.filter(
    following => !followers.includes(following)
  );
  const mutualFollowers = followers.filter(follower =>
    following.includes(follower)
  );

  return {
    followers,
    following,
    notFollowingBack,
    notFollowedBack,
    mutualFollowers,
  };
};

export const parseUserList = (content: string): string[] => {
  // First, try to clean the content by removing null bytes and other binary artifacts
  const cleanedContent = content
    .replace(/\u0000/g, '') // Remove null bytes
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '') // Remove other control characters
    .trim();

  // If the content is still mostly binary, try to extract readable text
  if (
    cleanedContent.length < 10 ||
    /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/.test(cleanedContent)
  ) {
    console.warn('Content appears to be binary, attempting to extract text...');
    // Try to find any readable text patterns
    const textMatches = cleanedContent.match(/[a-zA-Z0-9_@.-]+/g);
    if (textMatches) {
      return textMatches.filter(
        username =>
          username.length > 1 &&
          !username.match(/^(com\.apple|Mac OS X|ATTR|quarantine)$/i)
      );
    }
    return [];
  }

  const lines = cleanedContent.split('\n').filter(line => line.trim());
  const users: string[] = [];

  for (const line of lines) {
    // Try different parsing strategies
    let username = '';

    // JSON format
    try {
      const jsonData = JSON.parse(line);
      if (jsonData.username) username = jsonData.username;
      else if (jsonData.user) username = jsonData.user;
      else if (jsonData.name) username = jsonData.name;
      else if (jsonData.value) username = jsonData.value;
    } catch {
      // Not JSON, try CSV or plain text
      const parts = line.split(',');
      if (parts.length > 0) {
        username = parts[0].trim().replace(/['"]/g, '');
      } else {
        username = line.trim();
      }
    }

    // Clean the username
    username = username
      .replace(/[^\w@.-]/g, '') // Remove special characters except @, ., -
      .trim();

    if (
      username &&
      username.length > 1 &&
      !users.includes(username) &&
      !username.match(/^(com\.apple|Mac OS X|ATTR|quarantine|q\/|Chrome)$/i)
    ) {
      users.push(username);
    }
  }

  return users;
};
