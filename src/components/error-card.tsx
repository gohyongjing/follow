import { Card, CardContent } from '@/components/ui/card';

interface ErrorCardProps {
  error: string;
}

export function ErrorCard({ error }: ErrorCardProps) {
  return (
    <Card className="border-destructive mt-6">
      <CardContent className="pt-6">
        <div className="bg-destructive/10 border-destructive/20 rounded-md border p-4">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      </CardContent>
    </Card>
  );
}
