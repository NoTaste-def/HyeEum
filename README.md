# HyeEum

OpenAI(ChatGTP, DALL・E)를 활용한 ReactJS기반 멘탈 헬스케어 모바일 웹 어플리케이션입니다.
<br/>

> 日本語
> <br/>
> OpenAI(ChatGPT, DALL・E)を活用した ReactJS 基盤のメンタルヘルスケアのためのモバイルウェブアプリケーションです。 本プロジェクトでは AOS パートを担当しました。
> <br/> ><br/>
> English
> <br/>
> ReactJS-based mental health care mobile web application utilizing OpenAI (ChatGTP, DALL·E).
> <br/>

### [Presentation Material.](https://www.canva.com/design/DAGGbhw80f8/_AjXGy2L6NZJqOK1R_krLA/view?utm_content=DAGGbhw80f8&utm_campaign=share_your_design&utm_medium=link&utm_source=shareyourdesignpanel)

> #### The demonstration video starts from page 33

<br/>
<br/>

# 努力

## CSS

### 問題状況

> 携帯電話のサイズは多様だ。そのため、これらの部分を反映して、様々な画面サイズに応じて UI の配置が適切に行われる必要がある。

### 解決方法

各 UI の位置を margin プロパティに vh、vw を直接指定して調整した。
<br/>
画面のサイズを変えると、UI がビューポートに合わせて移動する。
<br/>
しかし、margin プロパティに直接指定した vh、vw は様々な画面サイズに対応するには適切ではなかった。
<br/>
<br/>

### 問題状況

> UI の配置が特定の画面に最適化されている。

### 解決方法

各 UI の配置を Relative、Absolute を活用してレスポンシブに UI が配置されるようにした。
<br/>
Main.js の下部には.mainBtnCon が存在し、これは常に画面の下部に位置する必要があった。
<br/>
これを実現するために、position に sticky を指定した。
<br/>
ただし、sticky は親要素の下に余白が存在しなければ画面の下部に固定的に位置することができない。そのため、.mainBtnCon の上位要素である.mainCon の padding-bottom を 120%に設定した。
<br/>
<br/>
++
```
<div id='wrapper'>
  <div>
    content
  </div>
</div>
<footer></footer>
```
```
#wrapper{
  height : 100%;
}
footer{
  position : relative;
  transform : translateY(-100%);
}
```
このようなコードにも解決することができた。

<br/>
<br/>

## React.js

### 問題状況

> diary/ エンドポイントで絵を生成して保存した後、main/ エンドポイントに移動したとき、更新されたライブラリ情報がすぐに反映されない。

### 解決方法

コードを詳細に調査した結果、Main.js の useEffect 部分に問題があることがわかった。
<br/>
最初に Main.js がマウントされる時に LocalStorage からユーザーの情報と更新以前のライブラリオブジェクトを取り出し、この情報を useState 変数に格納して保存する。
<br/>
サーバーから更新されたライブラリオブジェクトを受け取るのはこの次の段階なので、コードの実行順序が正しくない。
<br/>
さらに、LocalStorage に保存するロジックは不要なロジックである。毎回保存して取り出す演算を行うため、追加の時間がかかる。
<br/>
NickConfirmModal.js を確認すると、ユーザーはすでに Redux を通じて管理されている。
<br/>
したがって、NickConfirmModal.js と Main.js の LocalStorage に関連するロジックをすべて削除し、useSelector を活用してユーザーの状態管理を行う方が良い。
<br/>
要するに、
<br/>
LocalStorage に関連するロジックをすべて削除する。
<br/>
また、ユーザーの情報は Redux を通じて管理し、ライブラリオブジェクトはサーバーからの応答を受け取るとすぐに useState 変数に格納して管理します。
<br/>
このような改善により問題を適切に解決し、不要な演算を削減することができた。
<br/>
<br/>

## [ History ] - Branch YK

###### 2024-04-03 : Planning a function that can be completed by the deadline. And Discussion about concept of service

###### 2024-04-30 : Created Repository

###### 2024-05-01 : Discussing databases and APIs

###### 2024-05-05 : Test Setting

###### 2024-05-14 : Configuring the Basic Steps of the Main & Settings Page

###### 2024-05-20 : Configuring Introduction Pages, Main, Setting and Statistic Page. Also, partialy hooked up with APIs

###### 2024-05-28 : Prot. HyeEum is completion

<br/>
<br/>
<br/>
<br/>

# 노력

## CSS

### 문제상황

> 우리가 사용하는 휴대전화의 크기는 다양하다. 따라서 이러한 부분을 반영하여 다양한 스크린 사이즈에 따라 UI의 배치가 적절히 이루어져야 했다.

### 해결방법

각 UI의 위치를 margin 속성에 vh, vw 를 직접 부여하여 조절하였다.
<br/>
스크린의 크기를 다양하게 하면 UI가 뷰포트에 맞춰 이동하게 된다.
<br/>
margin 속성에 직접 부여한 vh, vw의 경우 다양한 스크린 사이즈에 대응하기에는 적절하지 않았다.
<br/>
따라서 특정 스크린 사이즈에만 최적화되는 문제가 발생했다.
<br/>
<br/>

### 문제상황

> 특정 환경에만 최적화가 되어있다.

### 해결방법

각 UI의 배치를 Relative, Absolute 를 활용하여 Responsive하게 UI가 배치될 수 있도록 하였다.
<br/>
Main.js 하단에는 .mainBtnCon이 존재하는데, 이는 항상 스크린 하단에 위치하도록 해야했다.
<br/>
이를 위해 position에 sticky를 부여하였다.
<br/>
다만 sticky는 부모 요소 아래에 여백이 존재해야 스크린 하단에 고정적으로 위치할 수 있으므로, .mainBtnCon의 상위 요소인 .mainCon의 padding-bottom을 120%로 지정해주었다.
<br/>
<br/>

## React.js

### 문제상황

> diary/ 엔드포인트에서 그림을 생성하고 저장한 뒤 main/ 엔드포인트로 이동했을 때, 업데이트 된 library 정보가 곧바로 반영되지 앉는다.

### 해결방법

코드를 면밀히 살펴본 결과, Main.js의 useEffect 부분에서 문제가 발생했다는 것을 알았다.
<br/>
최초 마운트 시에 LocalStorage에서 유저의 정보와 업데이트 이전의 Library 객체를 꺼내온 뒤, 이 정보를 state 변수에 담아 저장하게 된다.
<br/>
서버에서 업데이트된 Library 객체를 받아오는 것은 이 다음 단계이므로, 코드 실행의 순서가 올바르지 않았다.
<br/>
게다가 LocalStorage에 저장하는 로직은 불필요한 로직이다. 매번 저장하고 꺼내는 연산을 수행해야 하므로 추가적인 시간을 할애하게 된다.
<br/>
NickConfirmModal.js 를 확인하면, 유저의 경우 이미 Redux를 통해 관리되고 있다.
<br/>
따라서 NickConfirmModal.js와 Main.js의 LocalStorage와 관련된 로직을 전부 지우고 useSelector를 활용하여 유저의 상태관리를 해주는 편이 좋다고 보인다.
<br/>
따라서 정리를 하자면,
<br/>
LocalStorage와 관련된 로직은 전부 삭제한다.
<br/>
또한 유저의 정보는 Redux를 통해 관리하고, Library 객체는 서버에서 응답을 받는 즉시 useState 변수에 담아 관리한다.
<br/>
다음과 같은 개선으로 문제를 적절히 해결함과 동시에, 불필요한 연산을 줄일 수 있었다.
<br/>
<br/>
