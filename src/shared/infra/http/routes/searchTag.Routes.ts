import { Router } from 'express';
import { SearchTagController } from '@modules/Melhorenvio/useCases/searchTagController';

const searchTagController = new SearchTagController();
const SearchTag = Router();
SearchTag.get('/', searchTagController.handle);
export default SearchTag;
