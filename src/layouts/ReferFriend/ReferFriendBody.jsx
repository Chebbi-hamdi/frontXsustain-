import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import Footer from "../footer/footer";
import Copy from "../../assets/images/Refer/copy.svg";
import LogoCard from "../../drawables/cards/ReferFriend/LogoCard/LogoCard";
import Facebook from "../../assets/images/Refer/Facebook.svg";
import Insta from "../../assets/images/Refer/Insta.svg";
import X from "../../assets/images/Refer/X.svg";
import LinkedIn from "../../assets/images/Refer/LinkedIn.svg";
import Whatsup from "../../assets/images/Refer/Whatsup.svg";
import CardHint from "../../drawables/cards/ReferFriend/explicationCard/CardHint";
import reward from "../../assets/images/Refer/reward.svg";
import LLink from "../../assets/images/Refer/Link.svg";
import Team from "../../assets/images/Refer/Team.svg";
import LigneTabRef from "../../drawables/cards/ReferFriend/TabRefLigne/LigneTabRef";
import sent from "../../assets/images/Refer/Sent.svg";
import { useSendNotifMutation } from "../../functions/UseMutation/ReferFriend";
import { UseLink } from "../../functions/UseQuery/usefile";
import { FriendsRefs } from "../../functions/UseQuery/UseFriendReferes";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import LoaderSpin from "../../drawables/loader/LoaderSpin";

const ReferFriendBody = () => {
  const [email, setEmail] = useState("");
  const sendNotifMutation = useSendNotifMutation();
  const { Link, isLoading, refetch } = UseLink();
  const { Friends, refetchh, isLoadingg } = FriendsRefs();
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const recaptchaRef = useRef();
    
  const handleSend = async () => {
    setShowRecaptcha(true); // Show the reCAPTCHA
}

const handleRecaptcha = async () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
        alert("Please verify that you are not a robot!");
        return;
    }

      const response = await axios.post(
        "http://localhost:3000/api/v0/captcha/verify",
        {
          captchaValue: recaptchaValue,
          email,
        }
      );

      if (response.data.message === "Captcha valid") {
        const emailResponse = await sendNotifMutation.mutateAsync(email);

        if (emailResponse.success) {
          alert("Email sent successfully!");
          setEmail("");
          setShowRecaptcha(false);
          recaptchaRef.current.reset();
        } 
      } else {
        alert("Failed to verify captcha. Please try again.");
      }
    }


  //   const handleKeyPress = (event) => {
  //     if (event.key === "Enter") {
  //       handleSend();
  //     }
  //   };
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(Link.link);
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Error copying link to clipboard:", error);
    }
  };
  if(isLoading || isLoadingg)    return <LoaderSpin />;

  return (
    <div className={styles.MainRefFriend}>
      <div className={styles.CenterRef}>
        <div className={styles.BodyForReal}>
          <div className={styles.Top}>
            <div className={styles.centerTop}>
              <div className={styles.topright}>
                <div className={styles.centerrrr}>
                  <div className={styles.HintDiv}>
                    <p className={styles.Title}>
                      Spread Xsustain world and earn reward
                    </p>
                    <p className={styles.Txt}>
                      Get 40 credits For each person you refer to xsustain.
                    </p>
                  </div>
                  <div className={styles.InputDiv}>
                    <p className={styles.TitleInputDiv}>
                      Share your unique referral link{" "}
                    </p>
                    <div className={styles.flexInput}>
                      <input
                        value={Link?.link}
                        type="text"
                        className={styles.LinkInput}
                        placeholder={Link?.link}
                        readOnly
                      />
                      <div className={styles.ButtonLink}>
                        <div
                          className={styles.CenterFlex}
                          onClick={handleCopyLink}
                        >
                          <img
                            className={styles.inmg}
                            src={Copy}
                            alt="Copy Link"
                          ></img>
                          <p className={styles.Copy}>Copy</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.InputDiv0}
                    style={{ borderTop: "0px !important" }}
                  >
                    <p className={styles.TitleInputDiv}>Invite Via Email </p>
                    <div className={styles.flexInput}>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // onKeyPress={handleKeyPress}
                        type="email"
                        className={styles.LinkInput}
                        placeholder="Email@gmail.com"
                      />
                      <div className={styles.ButtonLink} onClick={handleSend}>
                        <div className={styles.CenterFlex}>
                          <img
                            className={styles.inmg}
                            src={sent}
                            alt="Sent"
                          ></img>
                          <p className={styles.Copy}>Send</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.LogosDiv}>
                    <LogoCard Logo={Facebook}></LogoCard>
                    <LogoCard Logo={Insta}></LogoCard>
                    <LogoCard Logo={X}></LogoCard>
                    <LogoCard Logo={LinkedIn}></LogoCard>
                    <LogoCard Logo={Whatsup}></LogoCard>
                  </div>
                </div>
              </div>
              <div className={styles.topleft}>
                <div className={styles.center}>
                  <CardHint
                    title={"Share your unique referral link "}
                    Txt={
                      "Invite your friends to join Xsustain using your unique referral link"
                    }
                    Img={LLink}
                    className={styles.shareLink}
                  />
                  <CardHint
                    title={"Your Team Joins"}
                    Txt={
                      "When your Team member joins xsustain through your shared link they become a part of our community and a part of your team ."
                    }
                    Img={Team}
                    className={styles.YourTeamjoin}
                  />
                  <CardHint
                    title={"You Both earn reward"}
                    Txt={
                      "As a token of appreciation , both you and your friend will receive 40 credits each ."
                    }
                    Img={reward}
                    className={styles.Reward}
                  />
                </div>
              </div>
            </div>
          </div>
          {showRecaptcha && (
            <ReCAPTCHA
              sitekey={
                process.env.REACT_APP_SITE_KEY ||
                "6LeQZ_YpAAAAAOvwB8Ldo30dxByemsu2SDZ7cvka"
              }
              ref={recaptchaRef}
              onChange={handleRecaptcha}
            />
          )}
          <div className={styles.Bottom}>
            <div className={styles.centerBottom}>
              <div className={styles.TtileDiv}>
                <p className={styles.TxtTitile}>Your Referal History</p>
              </div>
              <div className={styles.Headtab}>
                <div className={styles.flexEnddd}>
                  <div className={styles.invitedDiv}>
                    <p className={styles.Txt}>Invited</p>
                  </div>
                  <div className={styles.inviterDiv}>
                    <p className={styles.Txt}>Inviter</p>
                  </div>
                  <div className={styles.StatusDiv}>
                    <p className={styles.Txt}>Status</p>
                  </div>
                  <div className={styles.PositionDiv}>
                    <p className={styles.Txt}>Date</p>
                  </div>
                  <div className={styles.EarningDiv}>
                    <p className={styles.Txt}>Earning</p>
                  </div>
                </div>
              </div>
              <div className={styles.BodyTab}>
                {isLoadingg ? (
                  <div></div>
                ) : (
                  Friends?.map((f, index) => (
                    <LigneTabRef
                      timestamp={new Date(f?.timestamp)?.toLocaleDateString()}
                      status={f?.Status}
                      InvitedF={f?.user?.email?.primary}
                      key={index} // Don't forget to add a unique key prop
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ReferFriendBody;
