import { forwardRef, useRef, useEffect } from 'react';

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }: any, ref: any) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input
        type="checkbox"
        className="form-checkbox rounded-sm text-daabo-primary focus:outline-daabo-primary"
        ref={resolvedRef}
        {...rest}
      />
    </>
  );
});

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

export default IndeterminateCheckbox;
