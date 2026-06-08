import { Box, Container, Card, CardContent, Typography } from '@mui/material';

function AboutMe() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, px: 2, bgcolor: 'background.default' }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'var(--color-text-muted)',
            bgcolor: 'background.paper',
            px: { xs: 3, md: 5 },
            py: { xs: 5, md: 8 },
          }}
        >
          <CardContent>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
              About Me
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
              About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AboutMe;
