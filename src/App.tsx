import "./App.css";
import { useState } from "react";
import arrow from "./assets/icon-arrow.svg";
import {useForm} from "react-hook-form";

function App() {
  const [calculatedDays, setCalculatedDays] = useState<null | number>(null);
  const [calculatedMonths, setCalculatedMonths] = useState<null | number>(null);
  const [calculatedYears, setCalculatedYears] = useState<null | number>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const today = new Date();

    let bday = parseInt(data.day);
    let bmonth = parseInt(data.month);
    let byear = parseInt(data.year);


    let currDay = today.getDate();
    let currMonth = today.getMonth() + 1;
    let currYear = today.getFullYear();

    let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (bday > currDay) {
      currDay = currDay + month[currMonth - 1];
      currMonth = currMonth - 1;
    }

    if (bmonth > currMonth) {
      currMonth = currMonth + 12;
      currYear = currYear - 1;
    }

    let absDay = currDay - bday;
    let absMonth = currMonth - bmonth;
    let absYear = currYear - byear;

    setCalculatedDays(absDay);
    setCalculatedMonths(absMonth);
    setCalculatedYears(absYear);
  };

  return (
    <div className="w-full bg-offWhite h-screen flex justify-center items-center">
      <div className="rounded-2xl rounded-br-[20%] bg-white py-8 px-8 drop-shadow-lg shadow-black mx-4 md:mx-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <div className="top--date--provider--section w-[60%] flex flex-start gap-6">
              <div className="flex flex-col gap-1 w-28">
                <label
                  htmlFor="day"
                  className={`font-[Poppins] font-normal pb-2 ${errors.day ? 'text-red-600' : 'text-smokeyGrey'}`}
                >
                  DAY
                </label>
                <input
                  type="number"
                  id="day"
                  placeholder="DD"
                  className={`p-3 rounded-md border font-extrabold focus:outline-purple ${errors.day ? 'border-red-600 focus:outline-red-600' : 'border-smokeyGrey'}`}
                  {...register('day', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                    validate: (fieldValue) => {
                      return (
                        fieldValue === 0 || (fieldValue > 0 && fieldValue <= 32) || 'Must be a valid day'
                      );
                    },
                  })}
                />
                {typeof errors.day?.message === 'string' && <p className="text-red-600 text-xs text-left">{errors.day.message}</p>}
              </div>

              <div className="flex flex-col gap-1 w-28">
                <label
                  htmlFor="month"
                  className={`font-[Poppins] font-normal pb-2 ${errors.month ? 'text-red-600' : 'text-smokeyGrey'}`}
                >
                  MONTH
                </label>
                <input
                  type="number"
                  id="month"
                  placeholder="MM"
                  className={`p-3 rounded-md border font-extrabold ${errors.month ? 'border-red-600 focus:outline-red-600' : 'border-smokeyGrey focus:outline-purple'}`}
                  {...register('month', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                    validate: (fieldValue) => {
                      return (
                        fieldValue === 0 || (fieldValue > 0 && fieldValue <= 12) || 'Must be a valid month'
                      );
                    }
                  })}
                />
                {typeof errors.month?.message === 'string' && <p className="text-red-600 text-xs text-left">{errors.month?.message}</p>}
              </div>

              <div className="flex flex-col gap-1 w-28">
                <label
                  htmlFor="year"
                  className={`font-[Poppins] font-normal pb-2 ${errors.year ? 'text-red-600' : 'text-smokeyGrey'}`}
                >
                  YEAR
                </label>
                <input
                  type="number"
                  id="year"
                  placeholder="YYYY"
                  className={`p-3 rounded-md border font-extrabold ${errors.year ? 'border-red-600 focus:outline-red-600' : 'border-smokeyGrey focus:outline-purple'}`}
                  {...register('year', {
                    required: {
                      value: true,
                      message: 'This field is required'
                    },
                    validate: (fieldValue) => {
                      return (
                        fieldValue === 0 || (fieldValue > 0 && fieldValue <= new Date().getFullYear()) || 'Must be a valid year'
                      )
                    }
                  })}
                />
                {typeof errors.year?.message === 'string' && <p className="text-red-600 text-left text-xs">{errors.year?.message}</p>}
              </div>
            </div>
          </div>

          <div className="mid--line--button--section flex flex-row items-center my-6">
            <div className="flex-1 h-[1px] bg-smokeyGrey opacity-[20%]" />
            <div className="">
              <button className="rounded-full bg-purple text-white p-4 hover:bg-black hover:text-white transition duration-500">
                <img src={arrow} alt="" />
              </button>
            </div>
            <div className="flex-1 h-[1px] bg-smokeyGrey opacity-[20%] md:hidden" />
          </div>
        </form>

        <div className="bot--result--section mb-4">
          <div className="mb-2">
            {calculatedYears === null ? (
              <h1 className="font-extrabold text-5xl md:text-6xl font-[Poppins] italic">
                <span className="text-purple">--</span> years
              </h1>
            ) : (
              <h1 className="font-extrabold text-5xl md:text-6xl font-[Poppins] italic">
                <span className="text-purple">{calculatedYears}</span> years
              </h1>
            )}
          </div>

          <div className="mb-2">
            {calculatedMonths === null ? (
              <h1 className="font-extrabold text-5xl md:text-6xl font-[Poppins] italic">
                <span className="text-purple">--</span> months
              </h1>
            ) : (
              <h1 className="font-extrabold text-5xl md:text-6xl font-[Poppins] italic">
                <span className="text-purple">{calculatedMonths}</span> months
              </h1>
            )}
          </div>

          <div className="">
            {calculatedDays === null ? (
              <h1 className="font-extrabold text-5xl md:text-6xl font-[Poppins] italic">
                <span className="text-purple">--</span> days
              </h1>
            ) : (
              <h1 className="font-extrabold text-6xl font-[Poppins] italic">
                <span className="text-purple">{calculatedDays}</span> days
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
