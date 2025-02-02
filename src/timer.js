// @flow

// Animation frame based implementation of setTimeout.
// Inspired by Joe Lambert, https://gist.github.com/joelambert/1002116#file-requesttimeout-js

const hasNativePerformanceNow =
  typeof performance === 'object' && typeof performance.now === 'function';

const now = hasNativePerformanceNow
  ? () => performance.now()
  : () => Date.now();

export type TimeoutID = {|
  id: AnimationFrameID,
|};

export function cancelTimeout(timeoutID: TimeoutID, hostWindow: any) {
  hostWindow.cancelAnimationFrame(timeoutID.id);
}

export function requestTimeout(
  callback: Function,
  delay: number,
  hostWindow: any
): TimeoutID {
  const start = now();

  function tick() {
    if (now() - start >= delay) {
      callback.call(null);
    } else {
      timeoutID.id = hostWindow.requestAnimationFrame(tick);
    }
  }

  const timeoutID: TimeoutID = {
    id: hostWindow.requestAnimationFrame(tick),
  };

  return timeoutID;
}
