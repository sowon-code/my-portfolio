import { Box, Container, Card, CardContent, Typography } from '@mui/material';

function Section({ title, description, background = 'paper', accent = false }) {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        px: 2,
        bgcolor: background === 'paper' ? 'background.paper' : 'background.default',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: accent ? 'primary.main' : 'var(--color-text-muted)',
            bgcolor: accent ? 'primary.main' : 'background.paper',
            color: accent ? 'primary.contrastText' : 'text.primary',
            px: { xs: 3, md: 5 },
            py: { xs: 4, md: 6 },
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: 700, mb: 2, color: accent ? 'inherit' : 'primary.main' }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: accent ? 'inherit' : 'text.secondary', lineHeight: 1.8 }}
            >
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Section;
