import React from "react";
import "./Tutorial.css";
import { Link, useNavigate } from "react-router-dom";

export default function Tutorial() {
  const navigate = useNavigate();

  const goMain = () => {
    navigate("/");
  };
  return (
    <div className="centerIt">
      <div className="tutorial-container">
        <h1>Using sidebar - Creating Geneaological Tree</h1>

        <div className="tutorial-steps">
          <div className="step">
            <h3>Using Create member, create bound and line options.</h3>
            <p>
              Create members, add bounds that connect them, and customize your
              connection lines, to create easy to understand history of Your
              family tree.
              <br />
              <br />
              <img
                width="100%"
                src="https://firebasestorage.googleapis.com/v0/b/myfamilytree-c0588.appspot.com/o/tutorial%2FExample.png?alt=media&token=33bd4335-798d-4f8b-a100-fa849d843edb"
              />
              <br />
              <br />
              Customize them to Your own liking, and move them anywhere You want
              on the board.
            </p>
          </div>
          <div className="step">
            <h3>Using helpers</h3>
            <h4>1. Preset background gender</h4>
            <p>
              If you select preset background gender, every new member you
              create will have a background color based on their chosen gender.
            </p>
            <img src="https://firebasestorage.googleapis.com/v0/b/myfamilytree-c0588.appspot.com/o/tutorial%2Fbg.png?alt=media&token=108d610c-b3f7-4795-8631-b9f316b0088f" />
            <br />

            <p>Light Blue - Male gender</p>

            <p> Light Red - Female Gender</p>

            <img src="https://firebasestorage.googleapis.com/v0/b/myfamilytree-c0588.appspot.com/o/tutorial%2Fbg_exemple.png?alt=media&token=b55c251c-b7fe-4966-bb82-637e049c5dbc" />
            <br />
            <br />
            <h4>2. Select and move members</h4>
            <img src="https://firebasestorage.googleapis.com/v0/b/myfamilytree-c0588.appspot.com/o/tutorial%2Fselect1.png?alt=media&token=2d5ae87d-1301-4320-8e86-0b2ba82d635c" />
            <br />

            <p>
              When you select a member by clicking, the select and move members
              will trigger.
              <br />
              <br /> If you want to quickly deselect every member that is
              selected, just click on the switch.
            </p>
            <img src="https://firebasestorage.googleapis.com/v0/b/myfamilytree-c0588.appspot.com/o/tutorial%2Fselect2.png?alt=media&token=d51bd6d6-671d-4cbf-9f8d-a5dd9457f6cd" />
            <br />
            <br />
            <p>3. Make handles bigger</p>
            <p>
              If you have a hard time easily connecting the handles because they
              are too small (often problematic on smaller devices), you can make
              them bigger by clicking on the switch.
            </p>
            <img src="https://firebasestorage.googleapis.com/v0/b/myfamilytree-c0588.appspot.com/o/tutorial%2Fhandles.png?alt=media&token=fecaabf4-e00a-463e-b934-2d931b3663db" />
            <br />
            <br />
            <p>4. Add context</p>
            <p>
              If you want to add some context to what have happend that your
              family tree looks a certain way, you can do it by creating an Add
              context box.
            </p>
            <img src="https://firebasestorage.googleapis.com/v0/b/myfamilytree-c0588.appspot.com/o/tutorial%2Fchrome-capture-2023-9-11%20(1).gif?alt=media&token=03f2899f-0b3e-453d-855b-0bee96b14cfc" />
            <p>
              In order to edit the text inside add context box, you need to
              click on it <strong>twice</strong>, the same for closing the edit
              text.
            </p>
            <p>5. Delete selected nodes</p>
            <p>
              If you select nodes by clicking on them, their border will become
              blue.
            </p>
            <img src="https://firebasestorage.googleapis.com/v0/b/myfamilytree-c0588.appspot.com/o/tutorial%2FselectedMember.png?alt=media&token=44358262-28af-452a-8f3f-e128d02cfa3d" />
            <p>
              If you want to delete them, just click on the button, and all the
              selected nodes will be deleted.
            </p>
            <img src="https://firebasestorage.googleapis.com/v0/b/myfamilytree-c0588.appspot.com/o/tutorial%2Fdelete.png?alt=media&token=baefbbe1-b581-4bfe-b116-fa9897182f40" />
          </div>
          <div className="step">
            <h3>Select & Edit</h3>
            <p>
              1. By clicking on a member, you select it (border around the
              member becomes blue), if you select multiple members, you can move
              them around at the same time. If you want to deselect the member,
              just click again.
            </p>
            <p>
              2. By clicking on a member, you enable the edit option with an
              arrow, if you click on it, you can edit the data of the member,
              and also upload a default picture.
            </p>
            <img src="https://firebasestorage.googleapis.com/v0/b/myfamilytree-c0588.appspot.com/o/tutorial%2Fchrome-capture-2023-9-11.gif?alt=media&token=799f3544-23fb-4ac9-b319-b03d519ba516" />
            <p>
              2.1 If you want to upload an image, just choose a file, and after
              it loads, click Submit Image, you will get notified that the image
              has been uploaded.
            </p>
            <img src="https://firebasestorage.googleapis.com/v0/b/myfamilytree-c0588.appspot.com/o/tutorial%2Fedit.png?alt=media&token=80072eed-5a0b-4ed0-8cc1-2633d240ce22" />
            <br />
            <img src="https://firebasestorage.googleapis.com/v0/b/myfamilytree-c0588.appspot.com/o/tutorial%2Fedit2.png?alt=media&token=2579faf0-84aa-429b-8b44-5e334f0925f0" />{" "}
            <p>
              From now on the image will replace the default image based on the
              gender.
            </p>
          </div>
          <div className="step">
            <h3>Top Right Buttons</h3>
            <p>
              If you want to save your work, click save. <br />
              <br />
              You can also restore your work at anypoint to your last saved
              version.
              <br />
              <br />
              Undo and redo buttons will help you go back to certain state of
              your work.
              <br />
              <br />
              If you want to save your work to a svg file, you can simply click
              the download image button.
              <br />
              <br />
              <img src="https://firebasestorage.googleapis.com/v0/b/myfamilytree-c0588.appspot.com/o/tutorial%2Fsave.png?alt=media&token=fee74d15-b103-48dd-b02a-898bf5ed2b0e" />
            </p>
          </div>
        </div>
        <div className="step">
          <p>
            If you have any comments, problems or ideas regarding the
            MyFamilyTree app, feel free to contact me at myfamilytree@gmail.com
          </p>
          <button className="Rinko" onClick={goMain}>
            Take me to the login page
          </button>
        </div>
        <div className="step">
          <p>
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}
