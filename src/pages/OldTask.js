function OldTask() {
  return (
    <div className='TasksListDetails'>
      <div className='Col Col-0'>
        <h3>.</h3>
        {data.map((data, key) => {
          return (
            <span className='TaskId'>
                <img src={}
                     alt='delete icon' />
              {/* <input
                  key={key}
                  type="text"
                  name="fname"
                  defaultValue={data.id}
                ></input> */}
              </span>
          );
        })}
      </div>
      <div className='Col Col-1'>
        <h3>task name</h3>
        {data.map((data, key) => {
          return (
            <textarea
              key={key}
              type='text'
              name='fname'
              defaultValue={data.name}
            ></textarea>
          );
        })}
      </div>
      <div className='Col Col-2'>
        <h3>start time</h3>
        {data.map((data, key) => {
          return (
            <textarea
              key={key}
              type='datetime-local'
              name='fname'
              defaultValue={data['start-time']}
            ></textarea>
          );
        })}
      </div>
      <div className='Col Col-2'>
        <h3>end time</h3>
        {data.map((data, key) => {
          return (
            <textarea
              key={key}
              type='datetime-local'
              name='fname'
              defaultValue={data['end-time']}
            ></textarea>
          );
        })}
      </div>
      <div className='Col Col-2'>
        <h3>time spent</h3>
        {data.map((data, key) => {
          return (
            <textarea
              key={key}
              type='time'
              name='fname'
              defaultValue={data['time-spent']}
            ></textarea>
          );
        })}
      </div>
      <div className='Col Col-3'>
        <h3>hourly fee</h3>
        {data.map((data, key) => {
          return (
            <textarea
              key={key}
              type='text'
              name='fname'
              defaultValue={data['hourly-fee']}
            ></textarea>
          );
        })}
      </div>
      <div className='Col Col-4'>
        <h3>total fee</h3>
        {data.map((data, key) => {
          return (
            <textarea
              key={key}
              type='text'
              name='fname'
              defaultValue={data.id}
            ></textarea>
          );
        })}
      </div>
    </div>

  );
}
