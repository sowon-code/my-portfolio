import { Chip, Stack } from '@mui/material';
import { TECH_STACK_ICONS } from '../../lib/techStackIcons';

function TechStackChips({ techStack }) {
  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
      {techStack.map((tech) => {
        const entry = TECH_STACK_ICONS[tech];
        const Icon = entry?.icon;
        return (
          <Chip
            key={tech}
            icon={Icon ? <Icon style={{ color: entry.color }} /> : undefined}
            label={tech}
            size="small"
            sx={{ bgcolor: 'secondary.main', color: 'text.primary', fontWeight: 500 }}
          />
        );
      })}
    </Stack>
  );
}

export default TechStackChips;
