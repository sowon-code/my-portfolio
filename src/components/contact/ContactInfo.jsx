import { Box, Typography, Stack, IconButton, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const CONTACT_EMAIL = 'dnjsdl1086@naver.com';

const SNS_LINKS = [
  { label: 'GitHub', icon: GitHubIcon, href: 'https://github.com/sowon-code' },
  { label: 'Instagram', icon: InstagramIcon, href: '#' },
  { label: '카카오톡', icon: ChatBubbleIcon, href: '#' },
];

const roundIconButtonSx = {
  width: 48,
  height: 48,
  border: '1px solid',
  borderColor: 'primary.main',
  color: 'primary.main',
  '&:hover': {
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
  },
};

function ContactInfo() {
  return (
    <Stack spacing={4} sx={{ height: '100%', justifyContent: 'center' }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
          이메일
        </Typography>
        <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
          <EmailIcon sx={{ color: 'var(--color-accent)' }} />
          <Link
            href={`mailto:${CONTACT_EMAIL}`}
            underline="hover"
            sx={{ color: 'text.primary', fontWeight: 500 }}
          >
            {CONTACT_EMAIL}
          </Link>
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
          SNS
        </Typography>
        <Stack direction="row" spacing={1.5}>
          {SNS_LINKS.map(({ label, icon: Icon, href }) => {
            const isPlaceholder = href === '#';
            return (
              <IconButton
                key={label}
                component="a"
                href={href}
                target={isPlaceholder ? undefined : '_blank'}
                rel={isPlaceholder ? undefined : 'noreferrer'}
                onClick={isPlaceholder ? (event) => event.preventDefault() : undefined}
                aria-label={label}
                title={isPlaceholder ? `${label} (준비 중)` : label}
                sx={roundIconButtonSx}
              >
                <Icon />
              </IconButton>
            );
          })}
        </Stack>
      </Box>
    </Stack>
  );
}

export default ContactInfo;
