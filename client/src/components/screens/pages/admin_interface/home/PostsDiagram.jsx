import React, { useEffect, useState } from 'react';
import"./postDiagram.scss"
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import * as echarts from 'echarts';
import wishlist from "./userCharts/wishlist.png"
const PostsDiagram = () => {
    const giftlist = useSelector((state)=> state.giftlistReducer);
    const posts = useSelector((state)=> state.postReducer);
    //clock 
    const [date, setDate] = useState(new Date());

    useEffect(() => {
      setInterval(() => setDate(new Date()), 1000);
    }, []);
    //clock


    // posts by event type
    const [categoryCounts, setCategoryCounts] = useState([]);
    useEffect(() => {
      const countPostsByCategory = () => {
        const categories = ['Birthday', 'Marriage', 'Baby Shower', 'Event', 'Other'];
        const counts = categories.map((category) => {
          const count = posts.filter((post) => post.category === category).length;
          return count;
        });
        setCategoryCounts(counts);
      };
  
      countPostsByCategory();
      const myChart = echarts.init(document.getElementById('content-bars-container'));
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Birthday', 'Marriage', 'Baby Shower', 'Event', 'Other'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Posts',
            type: 'bar',
            barWidth: '60%',
            data: categoryCounts,
            itemStyle: {
              borderColor: '#fff',
              color: (params) => {
                const colors = ['#ffa2b5','#91cc75','#03a9f4', '#73c0de', '#5470c6', '#fad85d'];
                return colors[params.dataIndex % colors.length];
              },
            },
          }
        ]
      };
  
      myChart.setOption(option);
      window.addEventListener('resize', myChart.resize);
  
      return () => {
        window.removeEventListener('resize', myChart.resize);
        myChart.dispose();
      };
    }, [posts]);
    //posts by event type
//content by type
useEffect(() => {
    let PostsWithMedia = 0;

    posts.map((post) => {
      if (post.picture !== '' || post.video !== '') {
        PostsWithMedia++;
      }
      return null;
    });

    const contentData = [
      { value: posts.length, name: 'Total Posts' },
      { value: giftlist.length, name: 'Total Wishlists' },
      { value: PostsWithMedia, name: 'Posts with Media' },
      { value: posts.length-PostsWithMedia, name: 'Posts without Media' }
    ];
    const myChart = echarts.init(document.getElementById('content-chart-container'));
    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: "20%",
        left: "60%"
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
              fontSize: 13,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: true,
          },
          data: contentData,
        },
      ],
    };

    myChart.setOption(option);
    window.addEventListener('resize', myChart.resize);

    return () => {
      window.removeEventListener('resize', myChart.resize);
      myChart.dispose();
    };
  }, [posts,giftlist]);

  return (
    <div className='PostsDiagram-container' > 
        <div className="posts-first-row">
            <div className="calendar" style={{flex:"5"}}>
                <h4>Calendar</h4>
                <Calendar className="custom-calendar"/>
            </div>
            <div className="wishlist"  style={{flex:"5"}}>
              <div className="Digits">
                {("0" + date.getHours()).slice(-2)}
                <span>:</span>
                {("0" + date.getMinutes()).slice(-2)}
                <span>:</span>
                {("0" + date.getSeconds()).slice(-2)}
              </div>
            </div>
      </div>
      <div className="posts-by-eventType-conatiner" >
            <div className="posts-by-eventType">
                <h4>Posts By EventType</h4>
                <div id="content-bars-container" className='bars' style={{height:"25vh",marginTop: "-35px"}}></div>
            </div>
      </div>
      <div className="wishlist-by-eventType-conatiner" >
            <div className="wishlist-by-eventType">
                <h4>Content by type</h4>
                <img style={{position: "absolute",bottom:" 0%",left: "35%", width: "17%"}} src={wishlist} alt="wishlist" />
                <div id="content-chart-container" style={{height:"21vh"}}></div>
            </div>
      </div>
    </div>
    
  );
};

export default PostsDiagram;
