import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Chip,
  Menu,
  MenuItem,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  DateRange as DateRangeIcon,
  Label as LabelIcon,
  Flag as FlagIcon,
  Schedule as ScheduleIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const TaskSearchFilter = ({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFiltersChange, 
  availableLabels,
  availableCategories 
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateFilterAnchor, setDateFilterAnchor] = useState(null);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleDateFilterClick = (event) => {
    setDateFilterAnchor(event.currentTarget);
  };

  const handleDateFilterClose = () => {
    setDateFilterAnchor(null);
  };

  const updateFilter = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      priority: 'all',
      category: 'all',
      labels: [],
      dateRange: 'all',
      hasSubtasks: 'all',
      timeTracked: 'all'
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.priority !== 'all') count++;
    if (filters.category !== 'all') count++;
    if (filters.labels.length > 0) count++;
    if (filters.dateRange !== 'all') count++;
    if (filters.hasSubtasks !== 'all') count++;
    if (filters.timeTracked !== 'all') count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Box sx={{ mb: 3 }}>
      {/* Search Bar */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          sx={{ flexGrow: 1 }}
        />
        <Badge badgeContent={activeFilterCount} color="primary">
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={handleFilterClick}
          >
            Filters
          </Button>
        </Badge>
        {activeFilterCount > 0 && (
          <Button
            variant="text"
            onClick={clearAllFilters}
            startIcon={<ClearIcon />}
          >
            Clear
          </Button>
        )}
      </Box>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          {filters.priority !== 'all' && (
            <Chip
              label={`Priority: ${filters.priority}`}
              size="small"
              onDelete={() => updateFilter('priority', 'all')}
              color="primary"
              variant="outlined"
            />
          )}
          {filters.category !== 'all' && (
            <Chip
              label={`Category: ${filters.category}`}
              size="small"
              onDelete={() => updateFilter('category', 'all')}
              color="primary"
              variant="outlined"
            />
          )}
          {filters.labels.map((label) => (
            <Chip
              key={label.id}
              label={label.name}
              size="small"
              onDelete={() => updateFilter('labels', filters.labels.filter(l => l.id !== label.id))}
              sx={{ backgroundColor: label.color, color: 'white' }}
            />
          ))}
          {filters.dateRange !== 'all' && (
            <Chip
              label={`Date: ${filters.dateRange}`}
              size="small"
              onDelete={() => updateFilter('dateRange', 'all')}
              color="primary"
              variant="outlined"
            />
          )}
          {filters.hasSubtasks !== 'all' && (
            <Chip
              label={`Subtasks: ${filters.hasSubtasks}`}
              size="small"
              onDelete={() => updateFilter('hasSubtasks', 'all')}
              color="primary"
              variant="outlined"
            />
          )}
          {filters.timeTracked !== 'all' && (
            <Chip
              label={`Time: ${filters.timeTracked}`}
              size="small"
              onDelete={() => updateFilter('timeTracked', 'all')}
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
      )}

      {/* Filter Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFilterClose}
        PaperProps={{ sx: { minWidth: 250 } }}
      >
        <MenuItem>
          <Typography variant="subtitle2">Filter Options</Typography>
        </MenuItem>
        <Divider />
        
        {/* Priority Filter */}
        <MenuItem>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" gutterBottom>Priority</Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {['all', 'urgent', 'high', 'medium', 'low'].map((priority) => (
                <Chip
                  key={priority}
                  label={priority.charAt(0).toUpperCase() + priority.slice(1)}
                  size="small"
                  onClick={() => updateFilter('priority', priority)}
                  color={filters.priority === priority ? 'primary' : 'default'}
                  variant={filters.priority === priority ? 'filled' : 'outlined'}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
        </MenuItem>

        {/* Category Filter */}
        <MenuItem>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" gutterBottom>Category</Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {['all', ...availableCategories.map(cat => cat.id)].map((category) => (
                <Chip
                  key={category}
                  label={category === 'all' ? 'All' : availableCategories.find(cat => cat.id === category)?.name || category}
                  size="small"
                  onClick={() => updateFilter('category', category)}
                  color={filters.category === category ? 'primary' : 'default'}
                  variant={filters.category === category ? 'filled' : 'outlined'}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
        </MenuItem>

        {/* Labels Filter */}
        <MenuItem>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" gutterBottom>Labels</Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {availableLabels.map((label) => {
                const isSelected = filters.labels.some(l => l.id === label.id);
                return (
                  <Chip
                    key={label.id}
                    label={label.name}
                    size="small"
                    onClick={() => {
                      if (isSelected) {
                        updateFilter('labels', filters.labels.filter(l => l.id !== label.id));
                      } else {
                        updateFilter('labels', [...filters.labels, label]);
                      }
                    }}
                    sx={{
                      backgroundColor: isSelected ? label.color : 'transparent',
                      color: isSelected ? 'white' : label.color,
                      border: isSelected ? 'none' : `1px solid ${label.color}`,
                      cursor: 'pointer',
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        </MenuItem>

        {/* Date Range Filter */}
        <MenuItem onClick={handleDateFilterClick}>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2">Date Range</Typography>
            <Typography variant="caption" color="text.secondary">
              {filters.dateRange === 'all' ? 'All dates' : filters.dateRange}
            </Typography>
          </Box>
        </MenuItem>

        {/* Subtasks Filter */}
        <MenuItem>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" gutterBottom>Subtasks</Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {['all', 'with', 'without'].map((option) => (
                <Chip
                  key={option}
                  label={option.charAt(0).toUpperCase() + option.slice(1)}
                  size="small"
                  onClick={() => updateFilter('hasSubtasks', option)}
                  color={filters.hasSubtasks === option ? 'primary' : 'default'}
                  variant={filters.hasSubtasks === option ? 'filled' : 'outlined'}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
        </MenuItem>

        {/* Time Tracked Filter */}
        <MenuItem>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" gutterBottom>Time Tracked</Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {['all', 'with', 'without'].map((option) => (
                <Chip
                  key={option}
                  label={option.charAt(0).toUpperCase() + option.slice(1)}
                  size="small"
                  onClick={() => updateFilter('timeTracked', option)}
                  color={filters.timeTracked === option ? 'primary' : 'default'}
                  variant={filters.timeTracked === option ? 'filled' : 'outlined'}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
        </MenuItem>
      </Menu>

      {/* Date Range Menu */}
      <Menu
        anchorEl={dateFilterAnchor}
        open={Boolean(dateFilterAnchor)}
        onClose={handleDateFilterClose}
      >
        {[
          { value: 'all', label: 'All dates' },
          { value: 'today', label: 'Today' },
          { value: 'tomorrow', label: 'Tomorrow' },
          { value: 'thisWeek', label: 'This week' },
          { value: 'nextWeek', label: 'Next week' },
          { value: 'overdue', label: 'Overdue' },
        ].map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => {
              updateFilter('dateRange', option.value);
              handleDateFilterClose();
            }}
            selected={filters.dateRange === option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default TaskSearchFilter;
