import { Router, Request, Response } from 'express';
import * as searchController from '../controllers/search.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Global search
router.get('/', searchController.globalSearch);

// Advanced job search - map to searchJobs
router.get('/jobs', searchController.searchJobs);

// Search suggestions - map to getSearchSuggestions
router.get('/suggestions', searchController.getSearchSuggestions);

// Popular searches
router.get('/popular', searchController.getPopularSearches);

// Recent searches (requires auth) - use searchHistory if exists or stub
router.get('/recent', authenticate, searchController.getRecentSearches || searchController.globalSearch);

// Save search (requires auth) - stub with 501
router.post('/save', authenticate, (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Save search not implemented' });
});

// Delete saved search
router.delete('/save/:id', authenticate, (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Delete saved search not implemented' });
});

export default router;
