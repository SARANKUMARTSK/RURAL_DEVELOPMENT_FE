import React from 'react'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';

function About() {
  let navigate = useNavigate()
  return <>
  <div className="about-page">
    <div className="about-left-container">
      <img className='about-image1' src="https://sevalaya.org/wp-content/uploads/2023/04/DSC08239-scaled.jpg"  />
      <img className='about-image2' src="https://hpardb.in/assets/images/about-us.jpg"  />
      <img className='about-image3' src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202101/Republic-Rural-Development-Feb_1200x768.jpeg?size=690:388"  />
      <img className='about-image4' src="https://assets.entrepreneur.com/content/3x2/2000/1683810874-echnology.jpg"  />
      <img className='about-image5' src="https://capacity4dev.europa.eu/sites/default/files/styles/square_thumbnail/public/images/2023-05/Agriculture%20%26%20rural%20development.jpg?itok=OgcGXPcY"  />
      <img className='about-image6' src="https://m.economictimes.com/thumb/msid-85066439,width-1200,height-900,resizemode-4,imgsize-941346/electric-gett.jpg"  />
      <img className='about-image7' src="https://progressivepunjab.files.wordpress.com/2016/03/water-and-sanitation-projects-based-on-punjabs-effective-policy-proving-a-boon-for-rural-areas.png"  />
      <img className='about-image8' src="https://www.tbsnews.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2022/03/20/bangladesh-waste-management-on-landfill-drowning-in-waste-woima-corporation.jpg"  />
      <img className='about-image9' src="https://guardian.ng/wp-content/uploads/2017/10/food-wastage.jpg"  />
      <img className='about-image10' src="https://media.licdn.com/dms/image/C4E12AQFLz26HcUmRbg/article-inline_image-shrink_1000_1488/0/1604390280206?e=1718841600&v=beta&t=STmnab7qbXUDVfhYKfnYVwVcjCS1TI9Qma6zLKVA3Dw"  />
      <img className='about-image11' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTdtzA6KF0F_zMKtc5fOKNQYADCL_2ekKxfNYg9kdv-OQPepPY45_IrMh-YtQcz3ckbu8&usqp=CAU"  />
      <img className='about-image12' src="https://www.shutterstock.com/image-photo/traditional-indian-village-house-surrounded-260nw-2114401199.jpg"  />
    </div>

    <div className="about-center-container">
      <h2>Building Stronger Communities, One Rural Step at a Time. Together, We Shape the Future.</h2>
    </div>


    <div className="about-right-container">
      <img className='about-square-image1' src="https://www.jssbilaspur.org/wp-content/uploads/2015/10/JSS_VivekM-6464.jpg"  />
      <img className='about-square-image2' src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/201605/poor660_051716013645.jpg?size=948:533"  />
      <img className='about-square-image3' src="https://thelogicalindian.com/wp-content/uploads/2015/09/Untitled-110.jpg"  />
      <img className='about-square-image4' src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202107/rural-1200-sixteen_nine.jpg?size=1200:675"  />
      <img className='about-square-image5' src="https://www.worldbank.org/content/dam/Worldbank/Feature%20Story/sar/india/in-roads-2-735x490.jpg"  />
      <img className='about-square-image6' src="https://images.livemint.com/rf/Image-920x613/LiveMint/Period2/2018/04/07/Photos/Sundayapp/health-kJMH--621x414@LiveMint.JPG"  />
      <img className='about-square-image7' src="https://edurev.gumlet.io/ApplicationImages/Temp/12058070_74379633-3385-4cf5-a66d-a0f8cd4c6c6f_lg.png?w=400&dpr=2.6"  />
      <img className='about-square-image8' src="https://idronline.org/wp-content/uploads/2020/12/people-sitting-in-a-village-house_coronavirus.jpg"  />
    </div>
  </div>

  <div className="nav-bar">
    <ul>
      <li>Home</li>
      <li>Documents</li>
      <li>Contacts </li>
      <li>Gallery</li>
      <li onClick={()=>navigate('/login')}>Login<AdminPanelSettingsIcon/></li>
    </ul>
  </div>
  </>
}

export default About