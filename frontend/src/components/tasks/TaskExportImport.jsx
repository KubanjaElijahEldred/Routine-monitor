import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  Divider,
  Alert,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Upload as UploadIcon,
  FileDownload as FileDownloadIcon,
  FileUpload as FileUploadIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Description as DescriptionIcon,
  TableChart as TableChartIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

const TaskExportImport = ({ tasks, categories, labels, onImportTasks }) => {
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');
  const [exportOptions, setExportOptions] = useState({
    includeCompleted: true,
    includeSubtasks: true,
    includeTimeEntries: true,
    includeLabels: true,
    includeCategories: true,
  });
  const [importFile, setImportFile] = useState(null);
  const [importPreview, setImportPreview] = useState(null);
  const [importOptions, setImportOptions] = useState({
    mergeWithExisting: true,
    overwriteDuplicates: false,
    importCompleted: true,
    importSubtasks: true,
    importLabels: true,
  });

  const handleExport = () => {
    let exportData = {};
    
    // Filter tasks based on export options
    let tasksToExport = tasks;
    if (!exportOptions.includeCompleted) {
      tasksToExport = tasks.filter(task => !task.completed);
    }

    switch (exportFormat) {
      case 'json':
        exportData = {
          tasks: tasksToExport.map(task => {
            const taskData = {
              id: task.id,
              title: task.title,
              description: task.description,
              completed: task.completed,
              important: task.important,
              priority: task.priority,
              dueDate: task.dueDate,
              category: task.category,
              createdAt: task.createdAt,
            };
            
            if (exportOptions.includeSubtasks && task.subtasks) {
              taskData.subtasks = task.subtasks;
            }
            
            if (exportOptions.includeLabels && task.labels) {
              taskData.labels = task.labels;
            }
            
            return taskData;
          }),
          metadata: {
            exportDate: new Date().toISOString(),
            version: '1.0',
            totalTasks: tasksToExport.length,
          }
        };
        
        if (exportOptions.includeCategories) {
          exportData.categories = categories;
        }
        
        if (exportOptions.includeLabels) {
          exportData.labels = labels;
        }
        
        downloadFile(JSON.stringify(exportData, null, 2), 'tasks-export.json', 'application/json');
        break;

      case 'csv':
        const csvHeaders = ['Title', 'Description', 'Status', 'Priority', 'Category', 'Due Date', 'Created At'];
        const csvRows = tasksToExport.map(task => [
          task.title,
          task.description || '',
          task.completed ? 'Completed' : 'Active',
          task.priority,
          task.category || '',
          task.dueDate || '',
          task.createdAt,
        ]);
        
        const csvContent = [
          csvHeaders.join(','),
          ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');
        
        downloadFile(csvContent, 'tasks-export.csv', 'text/csv');
        break;

      case 'txt':
        const txtContent = tasksToExport.map(task => {
          let taskText = `${task.completed ? '✓' : '○'} ${task.title}\n`;
          if (task.description) taskText += `  Description: ${task.description}\n`;
          if (task.priority) taskText += `  Priority: ${task.priority}\n`;
          if (task.category) taskText += `  Category: ${task.category}\n`;
          if (task.dueDate) taskText += `  Due: ${task.dueDate}\n`;
          if (task.subtasks && task.subtasks.length > 0) {
            taskText += `  Subtasks:\n`;
            task.subtasks.forEach(subtask => {
              taskText += `    ${subtask.completed ? '✓' : '○'} ${subtask.title}\n`;
            });
          }
          return taskText + '\n';
        }).join('\n');
        
        downloadFile(txtContent, 'tasks-export.txt', 'text/plain');
        break;
    }
    
    setOpenExportDialog(false);
  };

  const downloadFile = (content, filename, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImportFile(file);
      previewImportFile(file);
    }
  };

  const previewImportFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        let parsedData;
        
        if (file.name.endsWith('.json')) {
          parsedData = JSON.parse(content);
        } else if (file.name.endsWith('.csv')) {
          parsedData = parseCSV(content);
        } else {
          throw new Error('Unsupported file format');
        }
        
        setImportPreview({
          format: file.name.endsWith('.json') ? 'JSON' : 'CSV',
          tasks: parsedData.tasks || [],
          categories: parsedData.categories || [],
          labels: parsedData.labels || [],
          metadata: parsedData.metadata || {},
        });
      } catch (error) {
        setImportPreview({ error: error.message });
      }
    };
    reader.readAsText(file);
  };

  const parseCSV = (content) => {
    const lines = content.split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const tasks = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
        const task = {};
        headers.forEach((header, index) => {
          task[header.toLowerCase().replace(/\s+/g, '_')] = values[index];
        });
        tasks.push(task);
      }
    }
    
    return { tasks };
  };

  const handleImport = () => {
    if (!importPreview || importPreview.error) return;
    
    let tasksToImport = importPreview.tasks;
    
    if (!importOptions.importCompleted) {
      tasksToImport = tasksToImport.filter(task => task.status !== 'Completed');
    }
    
    // Process tasks to ensure proper format
    const processedTasks = tasksToImport.map(task => ({
      id: Date.now() + Math.random(), // Generate new ID
      title: task.title || task.title || 'Untitled Task',
      description: task.description || '',
      completed: task.completed || task.status === 'Completed',
      important: task.important || false,
      priority: task.priority || 'medium',
      dueDate: task.due_date || task.dueDate || null,
      category: task.category || 'personal',
      subtasks: importOptions.importSubtasks ? (task.subtasks || []) : [],
      labels: importOptions.importLabels ? (task.labels || []) : [],
      createdAt: task.created_at || task.createdAt || new Date().toISOString(),
    }));
    
    onImportTasks(processedTasks, importOptions);
    setOpenImportDialog(false);
    setImportFile(null);
    setImportPreview(null);
  };

  return (
    <Box>
      {/* Export Button */}
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={() => setOpenExportDialog(true)}
        sx={{ mr: 1 }}
      >
        Export Tasks
      </Button>

      {/* Import Button */}
      <Button
        variant="outlined"
        startIcon={<UploadIcon />}
        onClick={() => setOpenImportDialog(true)}
      >
        Import Tasks
      </Button>

      {/* Export Dialog */}
      <Dialog open={openExportDialog} onClose={() => setOpenExportDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Export Tasks</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Export Format</InputLabel>
            <Select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              label="Export Format"
            >
              <MenuItem value="json">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DescriptionIcon sx={{ mr: 1 }} />
                  JSON (Full Data)
                </Box>
              </MenuItem>
              <MenuItem value="csv">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TableChartIcon sx={{ mr: 1 }} />
                  CSV (Spreadsheet)
                </Box>
              </MenuItem>
              <MenuItem value="txt">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormatListBulletedIcon sx={{ mr: 1 }} />
                  TXT (Plain Text)
                </Box>
              </MenuItem>
            </Select>
          </FormControl>

          <Typography variant="subtitle2" gutterBottom>
            Export Options
          </Typography>
          
          {Object.entries({
            includeCompleted: 'Include completed tasks',
            includeSubtasks: 'Include subtasks',
            includeLabels: 'Include labels',
            includeCategories: 'Include categories',
          }).map(([key, label]) => (
            <MenuItem key={key}>
              <Checkbox
                checked={exportOptions[key]}
                onChange={(e) => setExportOptions({ ...exportOptions, [key]: e.target.checked })}
              />
              <ListItemText primary={label} />
            </MenuItem>
          ))}

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Export will include {tasks.filter(t => exportOptions.includeCompleted || !t.completed).length} tasks
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExportDialog(false)}>Cancel</Button>
          <Button onClick={handleExport} variant="contained" startIcon={<FileDownloadIcon />}>
            Export
          </Button>
        </DialogActions>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={openImportDialog} onClose={() => setOpenImportDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Import Tasks</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<FileUploadIcon />}
              sx={{ mr: 2 }}
            >
              Choose File
              <input
                type="file"
                hidden
                accept=".json,.csv,.txt"
                onChange={handleFileSelect}
              />
            </Button>
            {importFile && (
              <Typography variant="body2" color="text.secondary">
                Selected: {importFile.name}
              </Typography>
            )}
          </Box>

          {importPreview && (
            <Box>
              {importPreview.error ? (
                <Alert severity="error">
                  <Typography variant="body2">
                    Error reading file: {importPreview.error}
                  </Typography>
                </Alert>
              ) : (
                <>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      File parsed successfully! Found {importPreview.tasks.length} tasks
                    </Typography>
                  </Alert>

                  <Typography variant="subtitle2" gutterBottom>
                    Import Options
                  </Typography>
                  
                  {Object.entries({
                    mergeWithExisting: 'Merge with existing tasks',
                    overwriteDuplicates: 'Overwrite duplicate tasks',
                    importCompleted: 'Import completed tasks',
                    importSubtasks: 'Import subtasks',
                    importLabels: 'Import labels',
                  }).map(([key, label]) => (
                    <MenuItem key={key}>
                      <Checkbox
                        checked={importOptions[key]}
                        onChange={(e) => setImportOptions({ ...importOptions, [key]: e.target.checked })}
                      />
                      <ListItemText primary={label} />
                    </MenuItem>
                  ))}

                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Preview (First 5 tasks)
                  </Typography>
                  
                  <List dense>
                    {importPreview.tasks.slice(0, 5).map((task, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {task.completed || task.status === 'Completed' ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            <ErrorIcon color="action" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={task.title || 'Untitled Task'}
                          secondary={`Priority: ${task.priority || 'medium'} | Category: ${task.category || 'none'}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImportDialog(false)}>Cancel</Button>
          <Button
            onClick={handleImport}
            variant="contained"
            disabled={!importPreview || importPreview.error}
            startIcon={<UploadIcon />}
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskExportImport;
