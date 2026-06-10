import { useCallback, useEffect, useState } from 'react';
import { Box, Container, Card, Grid, Typography, Divider, Snackbar, Alert } from '@mui/material';
import { supabase } from '../../lib/supabaseClient';
import { getMyEntryToken, getMyEntryIds, saveMyEntry, removeMyEntry } from '../../lib/guestbookStorage';
import ContactInfo from './ContactInfo';
import GuestbookForm from './GuestbookForm';
import GuestbookList from './GuestbookList';

const OPTIONAL_TEXT_FIELDS = ['name', 'affiliation', 'email', 'emoji', 'keyword'];

function normalizePayload(values) {
  const payload = {};
  OPTIONAL_TEXT_FIELDS.forEach((field) => {
    if (field in values) {
      const trimmed = (values[field] ?? '').trim();
      payload[field] = trimmed === '' ? null : trimmed;
    }
  });
  payload.message = values.message.trim();
  payload.rating = values.rating || null;
  return payload;
}

function ContactSection() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('guestbook_entries_public').select('*');

    if (error) {
      setSnackbar({ severity: 'error', message: '방명록을 불러오지 못했어요.' });
    } else {
      setEntries(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const myEntryIds = new Set(getMyEntryIds());

  const handleCreate = async (values) => {
    setSubmitting(true);
    const id = crypto.randomUUID();
    const editToken = crypto.randomUUID();

    const { error } = await supabase.from('guestbook_entries').insert({
      id,
      edit_token: editToken,
      ...normalizePayload(values),
    });

    setSubmitting(false);

    if (error) {
      setSnackbar({ severity: 'error', message: '등록에 실패했어요. 잠시 후 다시 시도해주세요.' });
      return;
    }

    saveMyEntry(id, editToken);
    setSnackbar({ severity: 'success', message: '방명록이 등록되었어요. 감사합니다!' });
    fetchEntries();
  };

  const handleUpdate = async (id, values) => {
    const token = getMyEntryToken(id);
    if (!token) return;

    setSubmitting(true);
    const payload = normalizePayload(values);
    const { data, error } = await supabase.rpc('update_guestbook_entry', {
      p_id: id,
      p_token: token,
      p_name: payload.name,
      p_message: payload.message,
      p_affiliation: payload.affiliation,
      p_emoji: payload.emoji,
      p_keyword: payload.keyword,
      p_rating: payload.rating,
    });

    setSubmitting(false);

    if (error || !data) {
      setSnackbar({ severity: 'error', message: '수정에 실패했어요. 잠시 후 다시 시도해주세요.' });
      return;
    }

    setSnackbar({ severity: 'success', message: '방명록이 수정되었어요.' });
    fetchEntries();
  };

  const handleDelete = async (id) => {
    const token = getMyEntryToken(id);
    if (!token) return;
    if (!window.confirm('방명록을 삭제할까요?')) return;

    const { data, error } = await supabase.rpc('delete_guestbook_entry', {
      p_id: id,
      p_token: token,
    });

    if (error || !data) {
      setSnackbar({ severity: 'error', message: '삭제에 실패했어요. 잠시 후 다시 시도해주세요.' });
      return;
    }

    removeMyEntry(id);
    setSnackbar({ severity: 'success', message: '방명록이 삭제되었어요.' });
    fetchEntries();
  };

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, px: 2, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 1, color: 'primary.main', textAlign: 'center' }}
        >
          Contact
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 4 }}>
          편하게 연락 주시거나, 방명록에 따뜻한 한마디를 남겨주세요 :)
        </Typography>

        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: '1px solid var(--color-text-muted)',
            bgcolor: 'background.paper',
            p: { xs: 3, md: 4 },
            mb: 5,
          }}
        >
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 5 }}>
              <ContactInfo />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <GuestbookForm onSubmit={handleCreate} submitting={submitting} />
            </Grid>
          </Grid>
        </Card>

        <Divider sx={{ mb: 3, borderColor: 'var(--color-text-muted)' }} />

        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
          방명록
        </Typography>

        {!loading && (
          <GuestbookList
            entries={entries}
            myEntryIds={myEntryIds}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            submitting={submitting}
          />
        )}
      </Container>

      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {snackbar && (
          <Alert severity={snackbar.severity} onClose={() => setSnackbar(null)}>
            {snackbar.message}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
}

export default ContactSection;
