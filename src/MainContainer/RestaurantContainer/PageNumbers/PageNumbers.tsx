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
      return <span key={page} onClick={handlePage} className="current number"> {page} </span>
    } else {
      return <span key={page} onClick={handlePage} className='not-current number'> {page} </span>
    }
  });
  useEffect(() => {
    mappedPages = pages.map(page => {
      if(parseInt(currentPage) === page){
        return <strong><span key={page} onClick={handlePage}> {page} </span></strong>
      } else {
        return <span key={page} onClick={handlePage}> {page} </span>
      }
    });
  }, [currentPage]);

  return (
    <div className='pages-container'>
      Page: &ensp;{mappedPages}
    </div>
  )
}