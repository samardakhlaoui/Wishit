import React, { useEffect } from 'react';
import './userDiagram.scss';
import * as echarts from 'echarts';
import { useSelector } from 'react-redux';

const UsersDiagram = () => {
  const users = useSelector((state) => state.usersReducer);
  let percentageColorFemale = 0;

  users.map((user) => {
    if (user.gender === 'Female') {
      percentageColorFemale++;
    }
    return null; 
  });

  percentageColorFemale = ((percentageColorFemale * 100) / users.length).toFixed(2);
  let percentageColorMale = 100 - percentageColorFemale;

  // Users by age
  useEffect(() => {
    const ageData = [];
    const ageCount = {
      '13-17': 0,
      '18-25': 0,
      '26-34': 0,
      '35-44': 0,
      '45-54': 0,
      '55-64': 0,
    };

    const getCurrentAge = (birthdate) => {
      const currentDate = new Date();
      const birthdateObj = new Date(birthdate);
      let age = currentDate.getFullYear() - birthdateObj.getFullYear();
      const monthDiff = currentDate.getMonth() - birthdateObj.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && currentDate.getDate() < birthdateObj.getDate())
      ) {
        age--;
      }

      return age;
    };

    users.forEach((user) => {
      const age = getCurrentAge(user.dateOfBirth);

      if (age >= 13 && age <= 17) {
        ageCount['13-17']++;
      } else if (age >= 18 && age <= 25) {
        ageCount['18-25']++;
      } else if (age >= 26 && age <= 34) {
        ageCount['26-34']++;
      } else if (age >= 35 && age <= 44) {
        ageCount['35-44']++;
      } else if (age >= 45 && age <= 54) {
        ageCount['45-54']++;
      } else if (age >= 55 && age <= 64) {
        ageCount['55-64']++;
      }
    });

    const totalCount = users.length;

    for (const [age, count] of Object.entries(ageCount)) {
      const percentage = ((count / totalCount) * 100).toFixed(2) + '%';
      ageData.push({ value: count, name: age, percent: percentage });
    }

    const myChart = echarts.init(document.getElementById('chart-container'));
    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: ageData,
        },
      ],
    };

    myChart.setOption(option);
    window.addEventListener('resize', myChart.resize);

    return () => {
      window.removeEventListener('resize', myChart.resize);
      myChart.dispose();
    };
  }, [users]);

  return (
    <div className="UsersDiagram-container">
      <div className="users-by-gender-container">
        <h4>Users by gender</h4>
        <div className="inner-container" style={{ display: 'flex' }}>
          <div className="stats" style={{ display: 'grid' }}>
            <div className="Female">
              <div className="legend">
                <h4>Female {percentageColorFemale}%</h4>
              </div>
              <div className="pourcentage"></div>
              <div className="Female-img">
                <div
                  className="Female-img-pink"
                  style={{ backgroundColor: '#F06292', width: `${percentageColorFemale}%` }}
                ></div>
                <div
                  className="Female-img-grey"
                  style={{ backgroundColor: 'white', width: ` ${percentageColorMale}%` }}
                ></div>
              </div>
            </div>
            <div className="Male">
              <div className="legend">
                <h4>Male {percentageColorMale}%</h4>
              </div>
              <div className="pourcentage"></div>
              <div className="Male-img">
                <div
                  className="Male-img-blue"
                  style={{ backgroundColor: '#6B8AEB', width: `${percentageColorMale}%` }}
                ></div>
                <div
                  className="Male-img-grey"
                  style={{ backgroundColor: 'white', width: ` ${percentageColorFemale}%`, transition:` width 0.5s ease-in-out`}}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="users-by-age-container">
        <h4>Users by age</h4>
        <div id="chart-container" style={{height:"50vh"}}></div>
      </div>
    </div>
  );
};

export default UsersDiagram;
