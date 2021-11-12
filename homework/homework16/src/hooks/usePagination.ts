export const DOTS = '...';

interface Props {
  totalCount: number,
  pageSize: number,
  siblingCount?: number,
  currentPage: number,
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: Props) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  // Pages count is determined as siblingCount + 3*firstPage + 3*lastPage + currentPage + 2*DOTS
  const totalPageNumbers = siblingCount + 9;

  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPageCount,
  );

  const shouldShowLeftDots = leftSiblingIndex > 4;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 3;

  const lastPageIndex = totalPageCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount;
    if (currentPage < 2) {
      leftItemCount = 3;
    } else {
      leftItemCount = currentPage + 1;
    }
    const leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, totalPageCount - 2, totalPageCount - 1, totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount;
    if (currentPage <= totalPageCount - 2) {
      rightItemCount = currentPage - 1;
    } else {
      rightItemCount = totalPageCount - 2;
    }
    const rightRange = range(
      rightItemCount,
      totalPageCount,
    );
    return [1, 2, 3, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, 2, 3, DOTS, ...middleRange, DOTS, lastPageIndex - 2, lastPageIndex - 1, lastPageIndex];
  }
  return [];
};
