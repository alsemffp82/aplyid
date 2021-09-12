<template>
  <div class="home-container">
    <div class="cursor"></div>
    <div class="cursor-follower"></div>
    <!-- Background image -->
    <div class="w-full h-screen flex align-items bg-center bg-cover bg-no-repeat home-bg" id="back-module">
      <!-- Button -->
      <div class="md:w-1/3 m-auto">
        <router-link class="btn px-4 py-2 uppercase rounded-sm text-lg text-center" 
                    to="/users"
        >Users Search</router-link>
      </div>
    </div>
    <!-- ** eye catching **  -->
  </div>
</template>

<script>
import $ from 'jquery';
import { TweenMax } from "gsap";

export default {
  name: 'Home',
  mounted() {
    // Cursor Effect
    let cursor = $(".cursor"),
        follower = $(".cursor-follower"),
        positionX = 0,
        positionY = 0,
        mouseX = 0,
        mouseY = 0;

    $(document).mousemove(function(e){
      mouseX = e.pageX;
      mouseY = e.pageY;
    });


    TweenMax.to({},0.016,{
      repeat: -1,
      onRepeat: function(){
        positionX += (mouseX - positionX) / 9;
        positionY += (mouseY - positionY) / 9;
        
        TweenMax.set(cursor,{
          css: {
              left: mouseX,
              top: mouseY
          }
        });
        
        TweenMax.set(follower,{
          css: {
              left: positionX - 11,
              top: positionY - 11
          }
        });
      }
    });

    $(".btn").on("mouseenter",function(){
        cursor.addClass("active");
        follower.addClass("active");
    });

    $(".btn").on("mouseleave",function(){
        cursor.removeClass("active");
        follower.removeClass("active");
    });
  }
}
</script>
<style>
  /* cursor effect */
  .cursor {
    position: absolute; 
    width: 10px; height: 10px;
    background: var(--primary-color); border-radius: 50%;
    z-index: 1000;
    user-select: none;
    pointer-events: none;
    transform: scale(1);
    transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out;
  }
  .cursor.active {
    opacity: 0.5;
    transform: scale(0);
  }
  .cursor-follower {
    position: absolute;
    width: 30px; height: 30px;
    background: rgba(252, 126, 178,0.3); 
    border-radius: 50%;
    user-select: none;
    pointer-events: none;
    transition: transform 0.6s ease-in-out, opacity 0.2s ease-in-out;
  }
  .cursor-follower.active {
    opacity: 0.7;
    transform: scale(4);
  }
  .hover {
    position: absolute; 
    left: 50%; top: 50%; transform: translate(-50%, -50%);
    text-decoration: none; color: var(--primary-text-color);
    font-size: 8vw;
    cursor: none;
  }

  .home-bg {
    background-image: url('../assets/home-bg.jpg');
  }
</style>