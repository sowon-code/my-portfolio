import { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, CircularProgress } from '@mui/material';
import { supabase } from '../lib/supabaseClient';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectDetailModal from '../components/projects/ProjectDetailModal';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (!error) {
        setProjects(data ?? []);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, px: 2, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1, color: 'primary.main', textAlign: 'center' }}>
          Projects
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 5 }}>
          직접 기획하고 만든 프로젝트들을 소개합니다.
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : projects.length === 0 ? (
          <Typography align="center" color="text.secondary">
            등록된 프로젝트가 없습니다.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid key={project.id} size={{ xs: 6, sm: 4, md: 3 }}>
                <ProjectCard project={project} onViewDetails={setSelectedProject} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <ProjectDetailModal project={selectedProject} open={Boolean(selectedProject)} onClose={() => setSelectedProject(null)} />
    </Box>
  );
}

export default Projects;
