import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function getDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function useDiaryCountForMonth(year, month) {
  const [diaryCount, setDiaryCount] = useState(0);

  useEffect(() => {
    const fetchDiaryCount = async () => {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0, 23, 59, 59); // 월의 마지막 날짜, 시간을 23:59:59로 설정

      const q = query(
        collection(db, 'diary'),
        where('createdAt', '>=', startDate),
        where('createdAt', '<=', endDate)
      );

      const querySnapshot = await getDocs(q);
      setDiaryCount(querySnapshot.docs.length);
    };

    fetchDiaryCount();
  }, [year, month]); // 의존성 배열에 year와 month 추가

  return diaryCount;
}

export default function Calender() {


  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const diaryCount = useDiaryCountForMonth(currentYear, currentMonth);

  const days = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  // 오늘 날짜 정보를 가져옵니다.
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    if (currentMonth === 11) {
      setCurrentYear((prevYear) => prevYear + 1);
    }
  };



  return (
    <>
      <p className=' text-xl'>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}엔 {diaryCount}개의 일기가 작성되었어요.</p>
      <p className=' text-xl mb-5'>오늘의 일기를 작성해보세요😊</p>
      <div className='bg-white  rounded-lg shadow-md overflow-hidden'>
        <div className="flex items-center ">
          <div className='bg-todayPink w-full h-14 flex items-center px-4'>
            <h2 className="flex-auto text-sm font-semibold text-white">
              {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
            </h2>
            <button
              type="button"
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-white hover:text-todayNavy"
              onClick={handlePrevMonth}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-white hover:text-todayNavy"
              onClick={handleNextMonth}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>

          </div>
        </div>
        <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>
        <div className="mt-2 grid grid-cols-7 text-sm">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="py-2"></div>
          ))}
          {days.map((day) => (
            <div key={day.toISOString()} className={classNames(
              "py-2",
              todayDate === day.getDate() && todayMonth === currentMonth && todayYear === currentYear ? "text-todayPink font-bold" : ""
            )}>
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full">
                <time dateTime={day.toISOString()}>{day.getDate()}</time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}