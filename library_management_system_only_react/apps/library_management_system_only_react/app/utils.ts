// function countDaysToDueDate(date: string, deadline_in_weeks: number) {
export function countDaysToDueDate(date: string) {
  const initialDate = new Date(date);
  const deadline_in_weeks = 2;
  const dueDate = new Date(initialDate.getTime() + deadline_in_weeks * 7 * 24 * 60 * 60 * 1000);
  const today = new Date();
  const difference = dueDate.getTime() - today.getTime();
  const diffTime = Math.abs(difference);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (difference < 0) {
    return `-${diffDays}`;
  } else {
    return diffDays;

  }
}

export function dueDate(initialDate: string) {
  const deadline_in_weeks = 2;
  const dueDate = new Date(initialDate).getTime() + deadline_in_weeks * 7 * 24 * 60 * 60 * 1000;
  return new Date(dueDate).toLocaleDateString();
}

export function printsDate(date: string) {
  return new Date(date).toLocaleDateString();
}

