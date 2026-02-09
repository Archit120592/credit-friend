import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { formatDate, getStatusColor, getRiskColor } from '../../utils/formatters';

const mockReports = [
  { id: 1, company: 'Tata Steel Ltd', type: 'Full Analysis', status: 'Approved', risk: 'Low', createdAt: '2026-02-08', score: 82 },
  { id: 2, company: 'Reliance Industries', type: 'Quick Assessment', status: 'Review', risk: 'Medium', createdAt: '2026-02-07', score: 68 },
  { id: 3, company: 'Mahindra Finance', type: 'Full Analysis', status: 'Draft', risk: 'Low', createdAt: '2026-02-06', score: 75 },
  { id: 4, company: 'Bajaj Auto', type: 'Full Analysis', status: 'Approved', risk: 'High', createdAt: '2026-02-05', score: 45 },
  { id: 5, company: 'Infosys Ltd', type: 'Quick Assessment', status: 'Approved', risk: 'Low', createdAt: '2026-02-04', score: 88 },
  { id: 6, company: 'Adani Enterprises', type: 'Full Analysis', status: 'Review', risk: 'Medium', createdAt: '2026-02-03', score: 62 },
  { id: 7, company: 'Wipro Ltd', type: 'Full Analysis', status: 'Draft', risk: 'Low', createdAt: '2026-02-02', score: 79 },
  { id: 8, company: 'HDFC Bank', type: 'Quick Assessment', status: 'Approved', risk: 'Low', createdAt: '2026-02-01', score: 91 },
];

const ReportList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = mockReports.filter((r) =>
    r.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Reports</Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage credit analysis reports
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/reports/generate')}>
          Generate Report
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search reports by company name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>,
            }}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Company</strong></TableCell>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>Score</strong></TableCell>
                  <TableCell><strong>Risk</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((report) => (
                  <TableRow key={report.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/reports/${report.id}`)}>
                    <TableCell sx={{ fontWeight: 500 }}>{report.company}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600} color={report.score >= 70 ? 'success.main' : report.score >= 50 ? 'warning.main' : 'error.main'}>
                        {report.score}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={report.risk} size="small" sx={{ bgcolor: getRiskColor(report.risk) + '18', color: getRiskColor(report.risk), fontWeight: 600 }} />
                    </TableCell>
                    <TableCell>
                      <Chip label={report.status} size="small" color={getStatusColor(report.status)} variant="outlined" />
                    </TableCell>
                    <TableCell>{formatDate(report.createdAt)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="View"><IconButton size="small" onClick={(e) => { e.stopPropagation(); navigate(`/reports/${report.id}`); }}><ViewIcon fontSize="small" /></IconButton></Tooltip>
                      <Tooltip title="Download"><IconButton size="small" onClick={(e) => e.stopPropagation()}><DownloadIcon fontSize="small" /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton size="small" onClick={(e) => e.stopPropagation()} color="error"><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReportList;
