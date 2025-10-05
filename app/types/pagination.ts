export type TPagination = {
  totalItems: number | string;         
  itemsPerPage: number;       
  currentPage: number;       
  onPageChange: (page: number) => void; 
};
