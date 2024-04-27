'use client'
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Draggable from 'react-draggable';
import './Style.css';

import Giftfile from '../components/Giftfile';
import Commentfile from '../components/CommentFile';

import { subscribeToLike, subscribeToChat, subscribeToGift } from '../socketconnection';

export default function SoketHand() {

    const [like, setlike] = useState([]);
    const [gift, setgift] = useState([]);
   // const [biggift, setbiggift] = useState([]);
    const [comment, setcomment] = useState([]);
    const [inputval, setinputval] = useState('');

   // useEffect(() => {}, []);


    const handleChange = (event) => {
        setinputval(event.target.value);
    }

    const handleClick = () => {
        alert("dddd");
        subscribeToLike(inputval, (data) => {
            // استخدم دالة setLike لتحديث الحالة بطريقة صحيحة
            setlike(prevState => {
                const existingIndex = prevState.findIndex(item => item.nickname === data.nickname);
                if (existingIndex === -1) {
                    // إذا كان العنصر غير موجود، قم بإضافته إلى قائمة الإعجابات
                    return [...prevState, data];
                } else {
                    // إذا كان العنصر موجودًا، قم بتحديث العدد الموجود
                    return prevState.map((item, index) => {
                        if (index === existingIndex) {
                            return { ...item, likeCount: item.likeCount + data.likeCount };
                        }
                        return item;
                    });
                }
            });
            // بعد تحديث الحالة، قم بفرزها بشكل منفصل
            setlike(prevState => [...prevState].sort((a, b) => b.likeCount - a.likeCount));
        });

        //! ________________________________________________________________________________

        subscribeToChat((data) => { setcomment(data); });


        //! ________________________________________________________________________________

        subscribeToGift((data) => {
            setgift(prevState => {
                const existingIndex = prevState.findIndex(item => item.nickname === data.nickname & item.giftName === data.giftName);
                if (existingIndex === -1) {
                    // إذا كان العنصر غير موجود، قم بإضافته إلى قائمة الإعجابات
                    return [...prevState, data];
                } else {
                    // إذا كان العنصر موجودًا، قم بتحديث العدد الموجود
                    return prevState.map((item, index) => {
                        if (index === existingIndex) {
                            return { ...item, repeatCount: item.repeatCount + data.repeatCount };
                        }
                        return item;
                    });
                }
            });
            setgift(prevState => [...prevState].sort((a, b) => b.repeatCount - a.repeatCount));
        });

    }


    return (
        <div className="row w-100">

            <div className="row row position-absolute top-0 end-0 w-25 pt-3">
                <div className="col-md-8">
                    <input type="text" value={inputval} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-4">
                    <button type="submit" onClick={handleClick} className="btn btn-outline-primary">START</button>
                </div>
            </div>

            <div className="col-md-4">
                <Draggable>
                    <div>
                        <div className='animated-background p-1 rounded-3 text-center '> TOP Like </div>
                        <div className='container w-100' style={{ maxHeight: "470px", overflow: "hidden" }} >
                            {like.map((item, index) => (
                                <div key={index} className='row bg-light  mt-2 p-1  rounded-3 '>
                                    <div className='col-md-2 '>
                                        <Image src={item.profilePictureUrl} width="50" height="50" className='rounded-circle' alt='' />
                                    </div>
                                    <div className='col-md-10 '>
                                        <p> {item.nickname} | Like Count: {item.likeCount} </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Draggable>
            </div>
            <div className="col-md-4">
                <div className="row">
                    <div className="col-md-12"><Giftfile content={gift} /></div>
                    <div className="col-md-12"><Commentfile content={comment} /></div>
                </div>
            </div>



        </div>
    )
}