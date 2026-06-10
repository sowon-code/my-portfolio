import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Rating,
} from '@mui/material';
import { POSITIVE_EMOJIS } from './emojiOptions';

const emptyValues = {
  name: '',
  message: '',
  affiliation: '',
  email: '',
  emoji: '',
  keyword: '',
  rating: null,
};

function GuestbookForm({
  initialValues,
  onSubmit,
  onCancel,
  submitting = false,
  submitLabel = '방명록 남기기',
  mode = 'create',
}) {
  const [values, setValues] = useState({ ...emptyValues, ...initialValues });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!values.message.trim()) {
      setErrorMessage('내용을 입력해주세요.');
      return;
    }

    setErrorMessage('');

    const payload = {
      name: values.name,
      message: values.message,
      affiliation: values.affiliation,
      emoji: values.emoji,
      keyword: values.keyword,
      rating: values.rating,
    };

    if (mode === 'create') {
      payload.email = values.email;
    }

    await onSubmit(payload);

    if (mode === 'create') {
      setValues(emptyValues);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {mode === 'create' && (
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
          방명록 남기기
        </Typography>
      )}

      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="이름"
            placeholder="비워두면 익명으로 표시돼요"
            value={values.name}
            onChange={handleChange('name')}
            size="small"
            fullWidth
          />
          <TextField
            label="소속/직업 (선택)"
            value={values.affiliation}
            onChange={handleChange('affiliation')}
            size="small"
            fullWidth
          />
        </Stack>

        <TextField
          label="내용"
          value={values.message}
          onChange={handleChange('message')}
          multiline
          minRows={3}
          required
          fullWidth
        />

        {mode === 'create' && (
          <TextField
            label="이메일 (비공개, 선택)"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            size="small"
            fullWidth
          />
        )}

        <Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            오늘의 기분 이모지 (선택)
          </Typography>
          <ToggleButtonGroup
            value={values.emoji || null}
            exclusive
            onChange={(event, newValue) => setValues((prev) => ({ ...prev, emoji: newValue ?? '' }))}
            sx={{
              flexWrap: 'wrap',
              gap: 1,
              '& .MuiToggleButtonGroup-grouped': {
                margin: 0,
                border: '1px solid var(--color-text-muted) !important',
                borderRadius: '50% !important',
              },
            }}
          >
            {POSITIVE_EMOJIS.map((emoji) => (
              <ToggleButton
                key={emoji}
                value={emoji}
                sx={{
                  width: 44,
                  height: 44,
                  fontSize: '1.25rem',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': { bgcolor: 'primary.dark' },
                  },
                }}
              >
                {emoji}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { sm: 'center' } }}>
          <TextField
            label="한마디 키워드 (선택)"
            placeholder="예: 따뜻한, 인상깊은"
            value={values.keyword}
            onChange={handleChange('keyword')}
            size="small"
            fullWidth
          />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', whiteSpace: 'nowrap' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              별점
            </Typography>
            <Rating
              value={values.rating}
              onChange={(event, newValue) => setValues((prev) => ({ ...prev, rating: newValue }))}
              sx={{ color: 'primary.main' }}
            />
          </Stack>
        </Stack>

        {errorMessage && (
          <Typography variant="body2" sx={{ color: 'error.main' }}>
            {errorMessage}
          </Typography>
        )}

        <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'flex-end' }}>
          {onCancel && (
            <Button onClick={onCancel} color="inherit">
              취소
            </Button>
          )}
          <Button type="submit" variant="contained" disabled={submitting} sx={{ borderRadius: 2 }}>
            {submitting ? '처리 중...' : submitLabel}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default GuestbookForm;
