import React from 'react';
import profilePic from '../../assets/images/profile_pic.png';
import Image from 'next/image';
import { TypingText } from '@jaiminmoslake7020/react-typing-text';

const profileText = "I am a fullstack developer with 10+ years of experience in web and mobile development. I have experience working with many different technologies. My current speciality is Front-End in ReactJs with TypeScript.";

const Profile = () => {
    return (
        <section className={"section section-profile"} >
            <article className={"section-content section-profile-content"}>
                <div className={"part"}>
                    <h2><TypingText text={profileText} duration={40} /></h2>
                </div>
                <div className={"part"} >
                    <div className={"image-wrapper goup-start "}>
                        <Image src={profilePic} alt={"Jaimin Pandya"} />
                    </div>
                </div>
            </article>
        </section>
    );
}

export default Profile;
