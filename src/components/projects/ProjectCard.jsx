import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TechStackChips from './TechStackChips';

function ProjectCard({ project, onViewDetails }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'var(--color-text-muted)',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(140, 59, 67, 0.18)',
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={project.thumbnail_url}
        alt={project.title}
        loading="lazy"
        sx={{ aspectRatio: '16 / 9', objectFit: 'cover', bgcolor: 'secondary.main' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </Typography>
        <TechStackChips techStack={project.tech_stack ?? []} />
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, gap: 1, flexWrap: 'wrap' }}>
        <Button
          size="small"
          variant="contained"
          startIcon={<LaunchIcon />}
          component="a"
          href={project.detail_url}
          target="_blank"
          rel="noreferrer"
        >
          Live Demo
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<GitHubIcon />}
          component="a"
          href={project.github_url}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </Button>
        <Button size="small" startIcon={<InfoOutlinedIcon />} onClick={() => onViewDetails(project)}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProjectCard;
