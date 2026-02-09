import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Grid,
  LinearProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { ArrowBack, AutoAwesome, Assessment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const companies = [
  { id: 1, name: 'Tata Steel Ltd' },
  { id: 2, name: 'Reliance Industries' },
  { id: 3, name: 'Mahindra & Mahindra' },
  { id: 4, name: 'Bajaj Auto' },
  { id: 5, name: 'Infosys Ltd' },
];

const reportSections = [
  { key: 'executive', label: 'Executive Summary' },
  { key: 'financial', label: 'Financial Analysis' },
  { key: 'ratios', label: 'Ratio Computation' },
  { key: 'risk', label: 'Risk Assessment' },
  { key: 'industry', label: 'Industry Analysis' },
  { key: 'recommendation', label: 'Recommendation' },
];

const steps = ['Select Company', 'Configure Report', 'Generate'];

const ReportGenerate = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [config, setConfig] = useState({
    companyId: '',
    reportType: 'full',
    sections: reportSections.map((s) => s.key),
    notes: '',
  });

  const handleSectionToggle = (key) => {
    setConfig((prev) => ({
      ...prev,
      sections: prev.sections.includes(key)
        ? prev.sections.filter((s) => s !== key)
        : [...prev.sections, key],
    }));
  };

  const handleGenerate = () => {
    setGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          toast.success('Report generated successfully!');
          navigate('/reports/1');
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const progressLabels = [
    { threshold: 0, label: 'Fetching company data...' },
    { threshold: 20, label: 'Computing financial ratios...' },
    { threshold: 40, label: 'Running AI credit analysis...' },
    { threshold: 60, label: 'Generating risk assessment...' },
    { threshold: 80, label: 'Compiling final report...' },
  ];

  const currentLabel = [...progressLabels].reverse().find((l) => progress >= l.threshold)?.label || '';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/reports')} sx={{ mb: 2 }}>
        Back to Reports
      </Button>

      <Typography variant="h4" fontWeight={700} gutterBottom>Generate Credit Report</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Use AI to generate a comprehensive credit analysis report
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>Select Company</Typography>
            <TextField
              fullWidth
              select
              label="Company"
              value={config.companyId}
              onChange={(e) => setConfig({ ...config, companyId: e.target.value })}
              sx={{ mb: 2 }}
            >
              {companies.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Report Type"
              value={config.reportType}
              onChange={(e) => setConfig({ ...config, reportType: e.target.value })}
            >
              <MenuItem value="full">Full Analysis</MenuItem>
              <MenuItem value="quick">Quick Assessment</MenuItem>
            </TextField>
          </CardContent>
        </Card>
      )}

      {activeStep === 1 && (
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>Report Sections</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Select which sections to include in the report
            </Typography>
            <FormGroup>
              <Grid container spacing={1}>
                {reportSections.map((section) => (
                  <Grid item xs={12} sm={6} key={section.key}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={config.sections.includes(section.key)}
                          onChange={() => handleSectionToggle(section.key)}
                        />
                      }
                      label={section.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Additional Notes (optional)"
              value={config.notes}
              onChange={(e) => setConfig({ ...config, notes: e.target.value })}
              sx={{ mt: 2 }}
              placeholder="Add any specific instructions for the AI analysis..."
            />
          </CardContent>
        </Card>
      )}

      {activeStep === 2 && (
        <Card>
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            {!generating ? (
              <>
                <AutoAwesome sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>Ready to Generate</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  AI will analyze the company data and generate a comprehensive credit report
                  with {config.sections.length} sections.
                </Typography>
                <Button variant="contained" size="large" startIcon={<Assessment />} onClick={handleGenerate}>
                  Generate Report with AI
                </Button>
              </>
            ) : (
              <Box sx={{ py: 4 }}>
                <AutoAwesome sx={{ fontSize: 64, color: 'primary.main', mb: 2, animation: 'spin 2s linear infinite', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>Generating Report...</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {currentLabel}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(progress, 100)}
                  sx={{ height: 8, borderRadius: 4, maxWidth: 400, mx: 'auto', mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {Math.min(Math.round(progress), 100)}%
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {!generating && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>
            Back
          </Button>
          {activeStep < steps.length - 1 && (
            <Button
              variant="contained"
              disabled={activeStep === 0 && !config.companyId}
              onClick={() => setActiveStep((s) => s + 1)}
            >
              Next
            </Button>
          )}
        </Box>
      )}
    </motion.div>
  );
};

export default ReportGenerate;
