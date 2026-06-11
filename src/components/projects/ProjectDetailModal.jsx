import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import TechStackChips from './TechStackChips';

function ProjectDetailModal({ project, open, onClose }) {
  if (!project) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: 'primary.main', pr: 6 }}>
        {project.title}
        <IconButton
          onClick={onClose}
          aria-label="닫기"
          sx={{ position: 'absolute', right: 8, top: 8, color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ borderColor: 'var(--color-text-muted)' }}>
        <Box
          component="img"
          src={project.thumbnail_url}
          alt={project.title}
          loading="lazy"
          sx={{
            width: '100%',
            aspectRatio: '16 / 9',
            objectFit: 'cover',
            borderRadius: 2,
            mb: 2,
            bgcolor: 'secondary.main',
          }}
        />
        <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.8, mb: 2 }}>
          {project.description}
        </Typography>
        <TechStackChips techStack={project.tech_stack ?? []} />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button startIcon={<GitHubIcon />} component="a" href={project.github_url} target="_blank" rel="noreferrer">
          GitHub
        </Button>
        <Button
          variant="contained"
          startIcon={<LaunchIcon />}
          component="a"
          href={project.detail_url}
          target="_blank"
          rel="noreferrer"
        >
          Live Demo
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectDetailModal;
