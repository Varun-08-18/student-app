import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({
  title,
  value
}: {
  title: string;
  value: string | number;
}) {

  return (
    <Card sx={{ width: 200 }}>

      <CardContent>

        <Typography color="text.secondary">
          {title}
        </Typography>

        <Typography variant="h4">
          {value}
        </Typography>

      </CardContent>

    </Card>
  );
}