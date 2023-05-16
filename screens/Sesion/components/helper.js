export const pad = (n) => {
  return n < 10 ? "0" + n : n;
};

export const handleTimer = (
  setTimer,
  remainingTime,
  timerStatus,
  countingSeconds,
  setCountingSeconds
) => {
  var hours = Math.floor(
    (countingSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((countingSeconds % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((countingSeconds % (1000 * 60)) / 1000);
  setTimer({ hours, minutes, seconds });
};
