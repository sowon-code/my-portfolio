import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Rating,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GuestbookForm from './GuestbookForm';

function formatDate(value) {
  return new Date(value).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function GuestbookList({ entries, myEntryIds, onUpdate, onDelete, submitting }) {
  const [editingId, setEditingId] = useState(null);
  const editingEntry = entries.find((entry) => entry.id === editingId);

  if (entries.length === 0) {
    return (
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 4 }}>
        아직 작성된 방명록이 없어요. 첫 번째 메시지를 남겨보세요!
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        {entries.map((entry) => {
          const isMine = myEntryIds.has(entry.id);
          return (
            <Grid key={entry.id} size={{ xs: 12, sm: 6 }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid var(--color-text-muted)',
                  bgcolor: 'background.paper',
                }}
              >
                <CardContent>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      {entry.emoji && <Typography variant="h6">{entry.emoji}</Typography>}
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {entry.name || '익명'}
                      </Typography>
                    </Stack>
                    {isMine && (
                      <Stack direction="row" spacing={0.5}>
                        <IconButton size="small" onClick={() => setEditingId(entry.id)} aria-label="수정">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => onDelete(entry.id)} aria-label="삭제">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    )}
                  </Stack>

                  {entry.affiliation && (
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {entry.affiliation}
                    </Typography>
                  )}

                  <Typography
                    variant="body2"
                    sx={{ mt: 1, mb: 1.5, color: 'text.primary', whiteSpace: 'pre-wrap' }}
                  >
                    {entry.message}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 1, mb: 1 }}>
                    {entry.keyword && (
                      <Chip label={`#${entry.keyword}`} size="small" sx={{ bgcolor: 'secondary.main' }} />
                    )}
                    {entry.rating && (
                      <Rating value={entry.rating} readOnly size="small" sx={{ color: 'primary.main' }} />
                    )}
                  </Stack>

                  <Typography variant="caption" sx={{ color: 'var(--color-text-muted)' }}>
                    {formatDate(entry.created_at)}
                    {entry.updated_at !== entry.created_at && ' (수정됨)'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={Boolean(editingEntry)} onClose={() => setEditingId(null)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700, color: 'primary.main' }}>방명록 수정</DialogTitle>
        <DialogContent>
          {editingEntry && (
            <GuestbookForm
              mode="edit"
              initialValues={{
                name: editingEntry.name || '',
                message: editingEntry.message || '',
                affiliation: editingEntry.affiliation || '',
                emoji: editingEntry.emoji || '',
                keyword: editingEntry.keyword || '',
                rating: editingEntry.rating || null,
              }}
              submitLabel="수정 완료"
              submitting={submitting}
              onCancel={() => setEditingId(null)}
              onSubmit={async (values) => {
                await onUpdate(editingEntry.id, values);
                setEditingId(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default GuestbookList;
