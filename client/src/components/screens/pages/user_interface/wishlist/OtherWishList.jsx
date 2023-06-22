import { useDispatch, useSelector } from "react-redux";
import { getSelfGiftlist, updateGiftLikedStatus } from "../../../../../actions/giftlist.actions";
import "./userwishlist.scss";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import beach from "../../../../../themes/beach.jpg";
import dogs from "../../../../../themes/dogs.jpg";
import flower from "../../../../../themes/flower.jpg";
import friends from "../../../../../themes/friends.jpg";
import leaf from "../../../../../themes/leaf.jpg";
export default function Wishlist() {
    const user = useSelector((state)=> state.userReducer);
    const giftList = useSelector((state) => state.giftlistReducer);
    const [likedGift, setLikedGift] = useState({});
    const dispatch= useDispatch();
    const id= useParams().id
    useEffect(() => {
        dispatch(getSelfGiftlist(id));
      }, [id, dispatch]);


      const handleLikeGift = (giftListId,giftId,isLiked) => {
        dispatch(updateGiftLikedStatus(giftListId,giftId,!isLiked));
      };
      

      const previewImage =
      giftList.length > 0
        ? giftList[0].theme === "beach"
          ? beach
          : giftList[0].theme === "dogs"
          ? dogs
          : giftList[0].theme === "flower"
          ? flower
          : giftList[0].theme === "friends"
          ? friends
          : leaf
        : null;
      
  return (
    <div className="big-container">
    <div className="wishlist-container" style={{ backgroundImage: `url(${previewImage})`, backgroundSize:"100% 100%" }}>
        {giftList.length > 0 ? ( 
      <div className="wishlist-content">
        <div className="event-type">
          <p>{giftList[0].category}</p>
        </div>
        <div className="gifts">
          {giftList[0].gifts.map((gift, index) => (
            <div key={index} className="gift">
              <div className='name-container' style={{display:"flex",justifyContent: "space-between"}}>
                <p >Gift: {gift.name}</p>
                <FavoriteBorderIcon
                  style={{ color: gift.isLiked ? 'red' : 'black' }}
                  onClick={() => handleLikeGift(giftList[0]._id,gift._id, gift.isLiked)}
                />
              </div>
              <div className='desc-container' style={{display:"flex",justifyContent: "space-between"}}>
                <p >Description: {gift.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
        ): (<h3 style={{paddingTop:"15px", alignContent:"center" ,display: "flex", gap: "5px", alignItems: "center"}}>
              No List Found <ErrorOutlineOutlinedIcon/>
            </h3>
        ) }
    </div>
    </div>
  );
}
