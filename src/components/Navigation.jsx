import { AppBar, Toolbar, Container, Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
];

function Navigation() {
  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
          <Stack direction="row" spacing={1}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                end={item.to === '/'}
                sx={{
                  color: 'primary.contrastText',
                  fontWeight: 500,
                  '&.active': {
                    textDecoration: 'underline',
                    textUnderlineOffset: '6px',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
