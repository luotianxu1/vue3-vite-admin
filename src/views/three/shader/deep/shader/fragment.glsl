precision lowp float;

uniform float uTime;

varying vec2 vUv;

#define PI 3.1415926;

// 随机函数
float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

// 旋转函数
vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main() {
    // 1 通过定点对应的uv，决定每一个像素在uv图像的位置，通过位置x,y决定颜色
    // gl_FragColor = vec4(vUv, 0.0, 1.0);

    // 2 对第一种变形
    // gl_FragColor = vec4(vUv, 1, 1);

    // 3 利用uv实现渐变效果,从左到右
    // float strength = vUv.x;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 4 利用uv实现渐变效果,从下到上
    // float strength = vUv.y;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 5 利用uv实现渐变效果,从上到下
    // float strength = 1.0 - vUv.y;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 6 利用uv实现短范围内渐变
    // float strength = vUv.y * 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 7 利用取模达到反复的效果
    // float strength = mod(vUv.y * 10.0 , 1.0);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 8 利用step函数 strp(edge, x)  如果x < edge，返回0，否则返回1
    // float strength = mod(vUv.y * 10.0 , 1.0);
    // strength = step(0.5,strength);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 9 利用step函数 strp(edge, x)  如果x < edge，返回0，否则返回1
    // float strength = mod(vUv.y * 10.0 , 1.0);
    // strength = step(0.8,strength);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 10 利用step函数 strp(edge, x)  如果x < edge，返回0，否则返回1
    // float strength = mod(vUv.x * 10.0 , 1.0);
    // strength = step(0.5,strength);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 11 条纹相加
    // float strength = step(0.5,mod(vUv.x * 10.0 , 1.0));
    // strength += step(0.5,mod(vUv.y * 10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 12 条纹相乘 
    // float strength = step(0.5,mod(vUv.x * 10.0 , 1.0));
    // strength *= step(0.5,mod(vUv.y * 10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 13 条纹相减
    // float strength = step(0.5,mod(vUv.x * 10.0 , 1.0));
    // strength -= step(0.8,mod(vUv.y * 10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 14 方块图形
    // float strength = step(0.2,mod(vUv.x * 10.0 , 1.0));
    // strength *= step(0.2,mod(vUv.y * 10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 15 T型
    // float barX = step(0.4,mod(vUv.x * 10.0 , 1.0)) * step(0.8,mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.4,mod(vUv.y * 10.0 , 1.0)) * step(0.8,mod(vUv.x * 10.0, 1.0));
    // float strength = barX + barY;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 16 T形移动
    // float barX = step(0.4,mod((vUv.x + uTime * 0.1) * 10.0 , 1.0)) * step(0.8,mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.4,mod(vUv.y * 10.0 , 1.0)) * step(0.8,mod(vUv.x * 10.0, 1.0));
    // float strength = barX + barY;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 17 T形偏移
    // float barX = step(0.4,mod(vUv.x * 10.0 - 0.2 , 1.0)) * step(0.8,mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.4,mod(vUv.y * 10.0 , 1.0)) * step(0.8,mod(vUv.x * 10.0, 1.0));
    // float strength = barX + barY;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 18 取两个值的最小值
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 19 取最大值
    // float strength = 1.0 - max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 20 小正方形
    // float strength = 1.0 - step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 21 利用取整实现条纹渐变
    // float strength = floor(vUv.x * 10.0) / 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 22 利用取整实现条纹渐变
    // float strength = floor(vUv.y * 10.0) / 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 23 条纹相乘实现渐变格子
    // float strength = floor(vUv.y * 10.0) / 10.0 * floor(vUv.x * 10.0) / 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 24 向上取整
    // float strength = ceil(vUv.y * 10.0) / 10.0 * floor(vUv.x * 10.0) / 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);


    // 25 随机
    // float strength = random(vUv);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 26 随机+格子效果
    // float strength = floor(vUv.y * 10.0) / 10.0 * floor(vUv.x * 10.0) / 10.0;
    // strength = random(vec2(strength,strength));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 27 依据length返回向量长度
    // float strength = length(vUv);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 28 根据distance计算2个向量的距离
    // float strength = 1.0 - distance(vUv,vec2(0.5,0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 29 根据相除实现星星
    // float strength = 0.15 / distance(vUv,vec2(0.5,0.5)) - 1.0;
    // gl_FragColor = vec4(strength, strength, strength, strength);

    // 30 设置vUv水平或者竖直变量
    // float strength = 0.15 / distance(vec2(vUv.x, vUv.y * 5.0),vec2(0.5,0.5)) - 1.0;
    // gl_FragColor = vec4(strength, strength, strength, strength);

    // 31 设置vUv水平或者竖直变量
    // float strength = 0.15 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5),vec2(0.5,0.5)) - 1.0;
    // strength += 0.15 / distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5),vec2(0.5,0.5)) - 1.0;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 32 旋转飞镖
    // vec2 rotationUv = rotate(vUv,3.14 * 0.25,vec2(0.5));
    // vec2 rotationUv = rotate(vUv, uTime, vec2(0.5));
    // float strength = 0.15 / distance(vec2(rotationUv.x, (rotationUv.y - 0.5) * 5.0 + 0.5),vec2(0.5,0.5)) - 1.0;
    // strength += 0.15 / distance(vec2(rotationUv.y, (rotationUv.x - 0.5) * 5.0 + 0.5),vec2(0.5,0.5)) - 1.0;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 33 小日本国旗
    // float strength = step(0.5,distance(vUv, vec2(0.5)) + 0.25);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 33 绘制圆
    // float strength = 1.0 - step(0.5,distance(vUv, vec2(0.5)) + 0.25);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 33 绘制圆环
    // float strength = step(0.5,distance(vUv, vec2(0.5)) + 0.35);
    // strength *= (1.0 - step(0.5,distance(vUv, vec2(0.5)) + 0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 34 渐变环
    // float strength = abs(distance(vUv, vec2(0.5)) - 0.25);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 35 打靶
    // float strength = step(0.1, abs(distance(vUv, vec2(0.5)) - 0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 36 圆环
    // float strength = 1.0 - step(0.1, abs(distance(vUv, vec2(0.5)) - 0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 37 波浪环
    // vec2 waveUv = vec2(
    //     vUv.x,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(waveUv, vec2(0.5)) - 0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 38 
    // vec2 waveUv = vec2(
    //     vUv.x + sin(vUv.y * 30.0) * 0.1,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(waveUv, vec2(0.5)) - 0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 39
    // vec2 waveUv = vec2(
    //     vUv.x + sin(vUv.y * 100.0) * 0.1,
    //     vUv.y + sin(vUv.x * 100.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(waveUv, vec2(0.5)) - 0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 40 根据角度显示视图
    // float angle = atan(vUv.x,vUv.y);
    // float strength = angle;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 41 根据角度实现螺旋渐变
    // float angle = atan(vUv.x - 0.5,vUv.y - 0.5);
    // float strength = (angle + 3.14) / 6.28;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 42 实现雷达扫射
    // float alpha = 1.0 - step(0.5, abs(distance(vUv, vec2(0.5))));
    // float angle = atan(vUv.x - 0.5,vUv.y - 0.5);
    // float strength = (angle + 3.14) / 6.28;
    // gl_FragColor = vec4(strength, strength, strength, alpha);

    // 43 通过时间实现动态选择
    // vec2 rotateUv = rotate(vUv, -uTime * 5.0, vec2(0.5));
    // float alpha = 1.0 - step(0.5, abs(distance(vUv, vec2(0.5))));
    // float angle = atan(rotateUv.x - 0.5,rotateUv.y - 0.5);
    // float strength = (angle + 3.14) / 6.28;
    // gl_FragColor = vec4(strength, strength, strength, alpha);

    // 44 万花筒
    // float angle = atan(vUv.x - 0.5,vUv.y - 0.5) / PI;
    // float strength = mod(angle * 10.0, 1.0);
    // gl_FragColor = vec4(strength, strength, strength, 1);
}