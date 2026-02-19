// export function generateTimeArray(skDate) {
//     const timeArray = [];
//     const now = new Date();
//     const specificDate = new Date(skDate);
  
//     let startHour;
//     if (specificDate.getDate() > now.getDate()) {
//       startHour = new Date(
//         specificDate.getFullYear(),
//         specificDate.getMonth(),
//         specificDate.getDate(),
//         10,
//         0,
//         0
//       );
//     } else {
//       startHour = new Date(
//         now.getFullYear(),
//         now.getMonth(),
//         now.getDate(),
//         now.getHours() >= 6 ? now.getHours() : 6,
//         0,
//         0
//       );
//     }
  
//     for (let i = 0; i < 24; i++) {
//       const currentTime = new Date(startHour.getTime() + i * 60 * 60 * 1000);
  
//       const hourString = currentTime.toLocaleString("en-US", {
//         hour: "numeric",
//         hour12: false,
//       });
//       const timeString = currentTime.toLocaleString("en-US", {
//         hour: "numeric",
//         minute: "numeric",
//         second: "numeric",
//         hour12: true,
//       });
  
//       timeArray.push({
//         hour: hourString,
//         time: timeString,
//       });
//     }
  
//     const currentTimeIndex = now.getHours();
//     // console.log(currentTimeIndex, "currentTimeIndex");
//     // console.log(
//     //   now,
//     //   "now",
//     //   now.toLocaleString("en-US", {
//     //     hour: "numeric",
//     //     minute: "numeric",
//     //     second: "numeric",
//     //     hour12: true,
//     //   })
//     // );
//     // console.log(timeArray, "timeArray");
  
//     const filteredTimeArray = timeArray.filter((timeObj, index) => {
//       if (specificDate.getDate() > now.getDate()) {
//         return true;
//       }
  
//       if (specificDate.getDate() === now.getDate()) {
//         if (index === currentTimeIndex) {
//           return true;
//         }
//         // console.log(
//         //   timeObj.hour >
//         //     now.toLocaleString("en-US", {
//         //       hour: "numeric",
//         //       hour12: false,
//         //     }),
//         //   "oondajdlfkajdfg"
//         // );
//         return (
//           timeObj.hour >
//           now.toLocaleString("en-US", {
//             hour: "numeric",
//             hour12: false,
//           })
//         );
//       }
  
//       return false;
//     });
//     // console.log(filteredTimeArray, "filteredTimeArray");
//     return filteredTimeArray;
//   }

export function generateTimeArray(skDate) {
  const timeArray = [];
  const now = new Date();
  const specificDate = new Date(skDate);

  let startHour;

  if (specificDate > now) {
    // Case 1: skDate is in the future
    startHour = new Date(
      specificDate.getFullYear(),
      specificDate.getMonth(),
      specificDate.getDate(),
      10,
      0,
      0
    );
  } else {
    // Case 2: skDate is today or in the past
    startHour = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours() > 10 ? now.getHours() : 10,
      0,
      0
    );
  }

  for (let i = 0; i < 20; i++) {
    const currentTime = new Date(startHour.getTime() + i * 60 * 60 * 1000);

    const hour = currentTime.getHours();

    // Only add hours between 10 and 20, or after the current hour
    if (specificDate > now) {
      if (hour > 10 && hour <= 20) {
        const hourString = currentTime.toLocaleString("en-US", {
          hour: "numeric",
          hour12: false,
        });
        const timeString = currentTime.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });

        timeArray.push({
          hour: hourString,
          time: timeString,
        });
        // console.log(timeArray, "pecificDate > now");
      }
    }

    if (
      specificDate < now &&
      hour > now.getHours() + 1 &&
      hour > 10 &&
      hour <= 20
    ) {
      const hourString = currentTime.toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      });
      const timeString = currentTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });

      timeArray.push({
        hour: hourString,
        time: timeString,
      });
      // console.log(timeArray, "timeArray"); 06:00:00 pm
    }
  }

  return timeArray;
}