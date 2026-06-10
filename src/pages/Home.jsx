import { Box } from '@mui/material';
import Section from '../components/Section';
import ContactSection from '../components/contact/ContactSection';

const sections = [
  {
    title: 'Hero',
    description: '여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.',
    background: 'default',
    accent: true,
  },
  {
    title: 'About Me',
    description:
      "여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.",
    background: 'paper',
  },
  {
    title: 'Skill Tree',
    description:
      '여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.',
    background: 'default',
  },
  {
    title: 'Projects',
    description:
      "여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.",
    background: 'paper',
  },
];

function Home() {
  return (
    <Box>
      {sections.map((section) => (
        <Section key={section.title} {...section} />
      ))}
      <ContactSection />
    </Box>
  );
}

export default Home;
