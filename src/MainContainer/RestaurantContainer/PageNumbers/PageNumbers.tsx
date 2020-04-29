import React, { useEffect } from 'react';
import './PageNumbers.css';

interface ParentProps {
  handlePage: (e: React.MouseEvent<HTMLElement>) => void;
  pages: number[];
  currentPage: string;
}

export default function PageNumbers({pages, handlePage, currentPage}: ParentProps) {

  let mappedPages: JSX.Element[] = pages.map(page => {
    if(parseInt(currentPage) === page){
      return <span key={page} onClick={handlePage} className="current"> {page} </span>
    } else {
      return <span key={page} onClick={handlePage} className='not-current'> {page} </span>
    }
  });
  useEffect(() => {
    console.log(currentPage, "currentPage")
    mappedPages = pages.map(page => {
      console.log(parseInt(currentPage) === page, currentPage, page, 'in map')
     if(parseInt(currentPage) === page){
       return <strong><span key={page} onClick={handlePage}> {page} </span></strong>
     } else {
       return <span key={page} onClick={handlePage}> {page} </span>
     }
   });
  }, [currentPage]);

  return (
    <div className='pages-container'>
      {mappedPages}
    </div>
  )
}