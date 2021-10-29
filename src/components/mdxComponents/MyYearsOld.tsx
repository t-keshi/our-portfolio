import { differenceInYears } from 'date-fns';
import React from 'react';

export const MyYearsOld: React.VFC = () => {
  const myBirthday = new Date('1993/6/21');
  const myYearsOld = differenceInYears(new Date(), myBirthday);

  return <>{myYearsOld}</>;
};
