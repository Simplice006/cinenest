import { Alert, Box, Button, Skeleton, Typography } from '@mui/material';

// Shows loading skeletons, an error with retry, an empty message, or the children.
export default function StateView({ loading, error, empty, emptyMessage = 'No results found.', onRetry, skeletonCount = 12, children }) {
  if (loading) {
    return (
      <Box role="status" aria-label="Loading" sx={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Box key={i} sx={{ flex: '0 0 auto', width: { xs: 130, sm: 160, md: 180 } }}>
            <Skeleton variant="rounded" sx={{ aspectRatio: '2 / 3', height: 'auto', width: '100%' }} />
            <Skeleton width="80%" />
          </Box>
        ))}
      </Box>
    );
  }
  if (error) {
    return (
      <Alert severity="error" action={onRetry && <Button color="inherit" size="small" onClick={onRetry}>Retry</Button>}>
        Something went wrong: {error}
      </Alert>
    );
  }
  if (empty) {
    return <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>{emptyMessage}</Typography>;
  }
  return children;
}
