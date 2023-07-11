// 获取轮播图相关的元素
const carouselImgs = document.querySelectorAll('.carousel-imgs li');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const countItems = document.querySelectorAll('.count ul li');

// 设置初始索引和计时器
let currentIndex = 0;
let nextIndex = 1;
let timer;
let isTransitioning = false; // 标记是否正在进行过渡
const transitionDuration = 500; // 过渡持续时间，单位为毫秒

// 自动播放函数
function playCarousel() {
  // 如果正在进行过渡，则不执行自动播放
  if (isTransitioning) {
    return;
  }

  // 切换到下一张图片
  transitionToSlide(nextIndex);
  currentIndex = nextIndex;
  nextIndex = (nextIndex + 1) % carouselImgs.length;
}

// 过渡到指定索引的幻灯片
function transitionToSlide(index) {
  if (index === currentIndex) {
    return;
  }

  // 更新过渡状态
  isTransitioning = true;

  // 计算幻灯片容器的位移距离
  const distance = -index * 100;

  // 添加过渡效果样式
  carouselImgs.forEach((img) => {
    img.style.transition = `transform ${transitionDuration}ms ease-in-out`;
    img.style.transform = `translateX(${distance}%)`;
  });

  // 等待过渡结束后执行操作
  setTimeout(() => {
    // 移除过渡效果样式
    carouselImgs.forEach((img) => {
      img.style.transition = '';
    });

    // 更新过渡状态
    isTransitioning = false;

    // 更新计数器样式
    updateCount();
  }, transitionDuration);
}

// 更新计数器样式
function updateCount() {
  countItems.forEach((item, index) => {
    item.classList.toggle('active', index === currentIndex);
  });
}

// 点击上一张按钮的事件处理函数
prevBtn.addEventListener('click', function() {
  // 如果正在进行过渡，则不执行点击事件
  if (isTransitioning) {
    return;
  }

  const prevIndex = (currentIndex - 1 + carouselImgs.length) % carouselImgs.length;
  transitionToSlide(prevIndex);
  nextIndex = currentIndex;
  currentIndex = prevIndex;
});



// 点击下一张按钮的事件处理函数
nextBtn.addEventListener('click', function() {
  // 如果正在进行过渡，则不执行点击事件
  if (isTransitioning) {
    return;
  }

  transitionToSlide(nextIndex);
  currentIndex = nextIndex;
  nextIndex = (nextIndex + 1) % carouselImgs.length;
});

// 给每张图片的链接添加点击事件，实现跳转功能
carouselImgs.forEach((img) => {
  const link = img.querySelector('a');
  if (link) {
    link.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
});

// 给每个计数器 li 标签添加点击事件
countItems.forEach((item, index) => {
  item.addEventListener('click', function() {
    // 如果正在进行过渡，则不执行点击事件
    if (isTransitioning) {
      return;
    }

    // 切换到指定索引的幻灯片
    transitionToSlide(index);
    currentIndex = index;
    nextIndex = (index + 1) % carouselImgs.length;
  });
});


// 开始自动播放
timer = setInterval(playCarousel, 3000);