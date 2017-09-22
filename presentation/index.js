// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Appear,
  Image,
  CodePane,
  TableBody,
  TableHeader,
  TableHeaderItem,
  TableItem,
  TableRow,
  Table,
  Typeface
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  redux: require("../assets/redux.png"),
  redux_architecture: require("../assets/redux_architecture.jpg"),
  async: require("../assets/async.png"),
  reduxObs: require("../assets/redux-observable.gif"),
  clockStream: require("../assets/clock-stream.gif"),
  cuckoo: require("../assets/cuckoo.jpg"),
  clockData: require("../assets/clock-data-stream.png"),
  basicStream: require("../assets/basic-stream.png"),
  notesStream: require("../assets/notes-stream.png"),
  filterStream: require("../assets/stream-filter.png"),
  rxjs: require("../assets/rxjs.png")
};

preloader(images);

const theme = createTheme({
  primary: "#000",
  secondry: "#fff",
  textBlue: "#0366d6",
  textPurple: "#764ABC",
  darktext: "#202020",
  "orange": "#FF9100",
  "offwhite": "#F5F4F0",
  textPink: "#B71C8D"

}, {
  secondry: { name: "Droid Serif", googleFont: true, styles: [ "400", "700i" ] }
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transitionDuration={500} theme={theme}>
        {/* Slide  */}
        <Slide id="intro" transition={["fade"]} bgColor="primary"
          notes="
            <ul>
              <li>Before we start, talk will have too many things</li>
              <li>Ask questions, will help, interupt, grab attention</li>
              <li>Let's focus</li>
            </ul>
          " >
          <Heading size={3} lineHeight={2} textColor="secondry">
            managing side effects in redux application using redux-observable
          </Heading>
        </Slide>
        {/* Slide  */}
        <Slide id="focus" transition={["fade"]} bgColor="primary"
          notes="
            <ul>
              <li>3 important things</li>
              <li>start with redux</li>
              <li>undertsand side effects, bad word</li>
              <li>crux of talk redux-observable</li>
              <li>Start with redux</li>
            </ul>
          ">
          <Heading size={3} lineHeight={2} textColor="darktext">
            managing <span style={{color: "#fff"}}>side effects</span> in <span style={{color: "#fff"}}>redux</span> application using <span style={{color: "#fff"}}>redux-observable</span>
          </Heading>
        </Slide>
        {/* Slide */}
        <Slide id="redux-intro" transition={["slide"]} bgColor="secondry"
          notes="
            <ul>
              <li>state management, state = data at given moment neccesary for app</li>
              <li>atomic state diff components/ if data neccesary, redux store in one object</li>
              <li>Function technique using reducer</li>
            </ul>
          ">
          <Image src={images.redux}></Image>
          <Appear fid="1">
            <Heading size={6} textColor="textBlue" margin={50}>State management library</Heading>
          </Appear>
          <Appear fid="2">
            <Heading size={6} textColor="textBlue" margin={50}>Atomic state</Heading>
          </Appear>
          <Appear fid="3">
            <Heading size={6} textColor="textBlue" margin={50}>Functional techniques</Heading>
          </Appear>
        </Slide>
        {/* Slide */}
        <Slide id="redux-what" transition={["slide"]} bgColor="secondry"
          notes="
            <ul>
              <li>we take action and state and return a new state</li>
              <li>reducers are used to implmen this</li>
              <li>let's have a look basic redux syntax</li>
            </ul>
          ">
          <Heading size={5} textColor="primary" lineHeight={6}>( action + <i style={{color: "#764ABC"}}>state</i> ) => <i style={{color: "#764ABC"}}>state + action.value</i></Heading>
          <Appear fid="1">
            <Heading size={6} textColor="textBlue" margin={50}>Returns a new state (immutable)</Heading>
          </Appear>
          <Appear fid="2">
            <Heading size={6} textColor="textBlue" margin={50}>Uses reducers</Heading>
          </Appear>
        </Slide>
        {/* Slide */}
        <Slide fill fit id="redux-how" transition={["slide"]} bgColor="#2D2D2D"
          notes="
            <ul>
              <li>Redux actions are nothing but functions but they have to emmit a type key in the object</li>
              <li>you can call them without any data or can also give some data</li>
              <li>reducers, we catch action and identify it's type and change state accordingly</li>
            </ul>
          ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderItem style={{color: "#fff"}}>actions</TableHeaderItem>
                <TableHeaderItem style={{color: "#fff"}}>reducer</TableHeaderItem>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <Appear fid={1}>
                  <TableItem><CodePane
                    lang="js"
                    source={require("raw-loader!../assets/redux_action.example")}
                    // style={{fontSize: "0.5em"}}
                    margin="0px auto"
                  />
                  </TableItem>
                </Appear>

                <Appear fid={2}>
                  <TableItem><CodePane
                    lang="js"
                    // style={{fontSize: "0.5em"}}
                    source={require("raw-loader!../assets/redux_reducer.example")}
                    margin="0px auto"
                  /></TableItem>
                </Appear>


              </TableRow>
            </TableBody>
          </Table>
        </Slide>
        {/* Slide */}
        <Slide id="redux-architecture" transition={["slide"]} bgColor="offwhite"
          notes="
            <ul>
              <li>View layer, where you write jsx, user interactions happen</li>
              <li>these fire actions</li>
              <li>The actions hit the reducer and make the state of the application</li>
              <li>Finally the state will update the view layerπ</li>
              <li>One cool thing, middleware, make up redux ecosystem.</li>
              <li>The actions you fire if provided will go through middlewares first and then hit reducers.</li>
              <li>Middlewares can be used to control actions, change the data from actions</li>
              <li>if promise middleware, it can catch actions that return a promise</li>
              <li>The middleware then resolve the promise and send the data to reducer</li>
              <li>really powerful and extremly useful, see them later</li>
            </ul>
          ">
          <Image style={{width: "95%", height: "auto"}} src={images.redux_architecture}></Image>
        </Slide>
        {/* Slide */}
        <Slide fit fill id="side-effets" transition={["slide"]} bgColor="secondry"
          notes="
            <ul>
              <li>what side effects are</li>
              <li>anything that runs out of the black box of our programms</li>
              <li>in js, any dom interaction like button click , any http ajax request are all side effects, even console.log is side effect</li>
              <li>as said before i don't like this word. negative sense, but these are the actually effects which are useful</li>
              <li>if programm runs without showing on dom or logging it anywhere, it is of no use</li>
              <li>thpugh they are callled side effcets because not purely computational, they are not deterministic.</li>
              <li>in case of ajax request it has to go out of your system, communicate with an external server</li>
              <li>and might as well as fail</li>
              <li>in sense of redux, side effects are simply actions that interact with outside world, like ajax, sockets</li>
            </ul>
          ">
          <Heading size={2} textColor="orange" lineHeight={2}>side effects</Heading>
          <Appear fid="1">
            <Heading size={6} textColor="primary" margin={50}>interactions outside the programm</Heading>
          </Appear>
          <Appear fid="2">
            <Heading size={6} textColor="primary" margin={50}>in redux, just simply actions</Heading>
          </Appear>
        </Slide>
        {/* Slide */}
        <Slide fit fill id="redux-actions" transition={["slide"]} bgColor="secondry"
          notes="
            <ul>
              <li>most of actions are synchronus, easy to manage</li>
              <li>like clicking a button and updating a value</li>
              <li>or maybe get some data from somewhere</li>
              <li>even some async like simple ajax can be easyly done in synchronus way</li>
            </ul>
          ">
          <Heading size={2} textColor="textBlue" lineHeight={2}>redux-actions</Heading>
          <Appear fid="1">
            <Heading size={6} textColor="primary" margin={50}>most actions can be managed easily</Heading>
          </Appear>
          <Appear fid="2">
            <Heading size={6} textColor="primary" margin={50}>clicks to update a value, get data from input</Heading>
          </Appear>
          <Appear fid="3">
            <Heading size={6} textColor="primary" margin={50}>even some async like simple ajax</Heading>
          </Appear>
        </Slide>
        {/* Slide */}
        <Slide fit fill id="async-actions" transition={["slide"]} bgColor="secondry"
          notes="
            <ul>
              <li>but what about async actions</li>
              <li>caceling ajax request, where one action has to deal with another</li>
              <li>compsed ajax, we make one netwrok request get some data and make another request based on previous data</li>
              <li>search a person, get the nameof person and then get the photos of a person can be an examples</li>
              <li>Rate limiting is yet another case, if you have a button to get data from network</li>
              <li>you don't want user to click it multiple times in a short span, flooding your server you multiple request</li>
              <li>advance socket use, where you use multiple socket data, recoonect them when internet fails</li>
            </ul>
          ">
          <Heading size={2} textColor="textBlue" lineHeight={2}>async actions</Heading>
          <Appear fid="1">
            <Heading size={6} textColor="primary" margin={50}>canceling ajax request</Heading>
          </Appear>
          <Appear fid="2">
            <Heading size={6} textColor="primary" margin={50}>multiple composed ajax</Heading>
          </Appear>
          <Appear fid="3">
            <Heading size={6} textColor="primary" margin={50}>rate limiting</Heading>
          </Appear>
          <Appear fid="4">
            <Heading size={6} textColor="primary" margin={50}>multi websockets and reconnection</Heading>
          </Appear>
        </Slide>
        {/* Slide */}
        <Slide fit fill id="async-is-hard" transition={["slide"]} bgColor="secondry"
          notes="
            <ul>
              <li>turns out managing async is really hard</li>
              <li>i love this tweet</li>
              <li>async is not determistic, data comes at varied amount of time and is not always sequential</li>
            </ul>
          ">
          <Heading size={4} textColor="primary" margin={10}>managing async is HARD !</Heading>
          <Image src={images.async} style={{width: "65%", height: "auto"}}></Image>
        </Slide>
        {/* Slide */}
        <Slide fit fill id="async-primitives" transition={["slide"]} bgColor="secondry"
          notes="
            <ul>
              <li>js has a few ways to deal witth ajax</li>
              <li>we all know callbacks, so i am not going to discuss it</li>
              <li>Promises are new async primitives and then we have observables</li>
              <li>we also have generator functions which are pausible functions</li>
              <li>and async await which is just sugar syntax over generator</li>
              <li>we don't need to cover every in this talk</li>
            </ul>
          ">
          <Heading size={2} textColor="primary" lineHeight={2}>managing async</Heading>
          <Appear fid="1">
            <Heading size={5} textColor="textBlue" margin={50}>callbacks</Heading>
          </Appear>
          <Appear fid="2">
            <Heading size={5} textColor="textBlue" margin={50}>promises</Heading>
          </Appear>
          <Appear fid="3">
            <Heading size={5} textColor="textBlue" margin={50}>observables</Heading>
          </Appear>
        </Slide>
        {/* Slide */}
        <Slide id="promises-vs-observables" transition={["slide"]} bgColor="secondry"
          notes="
            <ul>
              <li>Let's look at the key differences between promise and observables</li>
              <li>Promises are future guranteed, either return value or error</li>
              <li>once completed no more values come out of an promise</li>
              <li>observables on other hand can be canncelled, if we don't need them, we stop computing upon them</li>
              <li>they are multivalued, we can have observales that emmit many values as they are lazy evaluated.</li>
            </ul>
          ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderItem style={{color: "#000"}}><Heading size={3} textColor="primary" margin={50}>Promises</Heading></TableHeaderItem>
                <TableHeaderItem style={{color: "#000"}}><Heading size={3} textColor="primary" margin={50}>Observables</Heading></TableHeaderItem>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <Appear fid="1">
                  <TableItem>
                  <Heading size={5} textColor="textBlue" margin={50}>Guarenteed Future</Heading>
                  <Heading size={5} textColor="textBlue" margin={50}>Single Value</Heading>
                </TableItem>
                </Appear>
                <Appear fid="2">
                  <TableItem>
                    <Heading size={5} textColor="textBlue" margin={50}>Cancelable</Heading>
                    <Heading size={5} textColor="textBlue" margin={50}>Multiple Values</Heading>
                  </TableItem>
                </Appear>
              </TableRow>
            </TableBody>
          </Table>
        </Slide>
        {/* Slide */}
        <Slide fit fill id="what-are-observables" transition={["slide"]} bgColor="secondry"
          notes="
            <ul>
              <li>let's see what Observables help us in</li>
              <li>they help to express the effect of latency in aysn cprogramming, in a fairly simple way</li>
              <li>they encapsulate event handling</li>
              <li>erik meijers once said what is diffrence  between array and event </li>
              <li>we use higher order functions like map, filter, reduce etc, actually around 100 of those rae available</li>
            </ul>
          ">
          <Heading size={2} lineHeight={1.5} textColor="textPink">Observables</Heading>
          <Appear fid="1">
            <Heading size={5} textColor="primary" margin={50}>express effect of latency</Heading>
          </Appear>
          <Appear fid="2">
            <Heading size={5} textColor="primary" margin={50}>encapsulate event handling</Heading>
          </Appear>
          <Appear fid="3">
            <Heading size={5} textColor="primary" margin={50}>uses higher order functions like map, reduce, etc.</Heading>
          </Appear>
        </Slide>
        {/* Slide */}
        <Slide fit fill id="observable-mental-model" transition={["slide"]} bgColor="secondry"
          notes="
            <ul>
              <li>what side effects are</li>
              <li>anything that runs out of the black box of our programms</li>
              <li>in js, any dom interaction like button click , any http ajax request are all side effects, even console.log is side effect</li>
              <li>as said before i don't like this word. negative sense, but these are the actually effects which are useful</li>
              <li>if programm runs without showing on dom or logging it anywhere, it is of no use</li>
              <li>in sense of redux, side effects are simply actions that interact with outside world, like ajax, sockets</li>
            </ul>
          ">
          <Heading size={3} lineHeight={1} textColor="primary"><span style={{color: "#B71C8D"}}>observable</span> mental model</Heading>
          <Table>
            <TableBody>
              <TableRow>
                <Appear fid="1">
                  <TableItem>
                    <Image width="100%" src={images.clockStream} ></Image>
                  </TableItem>
                </Appear>
                <Appear fid="2">
                  <TableItem>
                    <Image width="100%" src={images.cuckoo} ></Image>
                  </TableItem>
                </Appear>
              </TableRow>
            </TableBody>
          </Table>
        </Slide>
        {/* Slide */}
        <Slide fit fill id="observable-mental-model-2" transition={["slide"]} bgColor="secondry">
          <Image style={{height: "450px", width: "auto"}} src={images.clockData}></Image>
        </Slide>
        {/* Slide */}
        <Slide fit fill id="stream-representation" transition={["slide"]} bgColor="#F5F5F5">
          <Heading size={3} lineHeight={2} textColor="textBlue">stream representation</Heading>
          <Image style={{width: "110%"}} src={images.basicStream}></Image>
        </Slide>
        {/* Slide */}
        <Slide fit fill id="notes-stream" transition={["slide"]} bgColor="#F3F3F3">
          <Heading size={3} lineHeight={2} textColor="textBlue">note's stream</Heading>
          <Image style={{width: "110%"}} src={images.notesStream}></Image>
        </Slide>
        {/* Slide */}
        <Slide fit fill id="filter-stream" transition={["slide"]} bgColor="#F3F3F3">
          <Heading size={3} lineHeight={2} textColor="textBlue">filtered stream</Heading>
          <Image style={{height: "auto", width:"100%"}} src={images.filterStream}></Image>
        </Slide>
        {/* Slide */}
        <Slide id="rxjs" transition={["slide"]} bgColor="secondry"
          notes="
            <ul>
              <li>Part of reactive extensions, so a lot many language with similar implementation</li>
              <li>documenattion is really good now, that wasn't case before, netflix made the new version of rxjs v5 and now they have really good documentaion and lots of tutorials, even my</li>
              <li>there are lot's of operator, like the once we ta;lked about before, there are about 100</li>
              <li>like filering, transformation, combination and many more</li>
              <li>consider it as lodash for async/ observables</li>
              <li>like lodash has many operators for object and array similarly rxjs has a lot of operator for observables</li>
            </ul>
          ">
          <Image style={{width: "40%"}} src={images.rxjs}></Image>
          <Appear fid="1">
            <Text textColor="textBlue" margin={50}>Similar apis in Java, Swift, Python, C# etc</Text>
          </Appear>
          <Appear fid="2">
            <Text textColor="textBlue" margin={50}>Documentation is really good now</Text>
          </Appear>
          <Appear fid="3">
            <Text textColor="textBlue" margin={50}>lot of operators (~100) like, filtering, transformation, combination etc.</Text>
          </Appear>
          <Appear fid="4">
            <Text textColor="textBlue" margin={50}>Lo-dash for async/observables</Text>
          </Appear>
        </Slide>
        {/* Slide */}
        <Slide id="rx-example" transition={["slide"]} bgColor="#2D2D2D"
          notes="
            <ul>
              <li>Redux actions are nothing but functions but they have to emmit a type key in the object</li>
              <li>you can call them without any data or can also give some data</li>
              <li>reducers, we catch action and identify it's type and change state accordingly</li>
            </ul>
          ">
          <Heading size={3} lineHeight={2} textColor="secondry">Notes Rx Example</Heading>
          <CodePane
            style={{padding: "0em !important"}}
            lang="js"
            source={require("raw-loader!../assets/rx_notes.example")}
            style={{fontSize: "0.8em"}}
            margin="0px auto"
          />
        </Slide>
        {/* Slide */}
        <Slide id="redux-observable" fit fill transition={["fade"]} bgColor="secondry">
          <Image src={images.reduxObs}></Image>
          <Heading size={2} lineHeight={3} textColor="primary">redux-observable</Heading>
        </Slide>
        {/* Slide */}
        <Slide id="redux+observable" fit fill transition={["fade"]} bgColor="secondry">
          <Image src={images.reduxObs}></Image>
          <Heading size={2} lineHeight={3} textColor="primary">redux + observable</Heading>
        </Slide>
        {/* Slide */}
        <Slide id="where-does-it-fit" fit fill transition={["slide"]} bgColor="secondry">
          <Heading size={1} lineHeight={1.5} textColor="primary">where does <span style={{color: "#B71C8D"}}>observable</span> fit in <span style={{color: "#764ABC"}}>redux</span> ?</Heading>
        </Slide>
        {/* Slide */}
        <Slide id="back-to-the-diagram" transition={["slide"]} bgColor="offwhite"
          notes="
            <ul>
              <li>i love this diagram, so where does observables play the role</li>
              <li>there is one particular thing happening here over a period of time, and that interests us</li>
              <li>we need to manage actions, they hit reducers at different amount of time.</li>
            </ul>
          ">
          <Image style={{width: "95%", height: "auto"}} src={images.redux_architecture}></Image>
        </Slide>
        {/* Slide */}
        <Slide id="actions-as-stream" fit transition={["slide"]} bgColor="secondry" notes="
          <ul>
            <li>so we can now have a middle listening to all actions as an observable stream</li>
            <li>from there on we can manipulate the stream of actions, we can combine actions, filter some actions, map once action to another</li>
            <li>we can even do stuff .ike delaying actions, launction multiple actions are racing them against each other</li>
            <li>there is alot lot more we can do, we basically get fine grain control over our actions</li>
          </ul>
          ">
          <Heading size={1} lineHeight={1.5} textColor="textBlue">actions <span style={{color: "#000"}}>as an </span>observable <span style={{color: "#000"}}>stream</span></Heading>
        </Slide>
        {/* Slide */}
        <Slide fit fill id="why-redux-observable" transition={["slide"]} bgColor="secondry"
          notes="
            <ul>
              <li>we can take advantages of reactive programming to control async effects</li>
              <li>tCancelation, is super easy, we can easily unsubscribe a stream</li>
              <li>as these are just streams, so you can you the vast amount of operators</li>
              <li>and compose a lot of actions togther</li>
            </ul>
          ">
          <Heading size={2} lineHeight={1.5} textColor="textPink">Why redux-observable</Heading>
          <Appear fid="1">
            <Heading size={5} textColor="primary" margin={50}>reactive programming to create async effects</Heading>
          </Appear>
          <Appear fid="2">
            <Heading size={5} textColor="primary" margin={50}>easy cancellation of async actions</Heading>
          </Appear>
          <Appear fid="3">
            <Heading size={5} textColor="primary" margin={50}>composing multiple actions using operators</Heading>
          </Appear>
        </Slide>
        {/* Slide */}
        <Slide id="demo" fill fit transition={["slide"]} bgColor="secondry">
          <Typeface font="SF Text" weight={600} italic={true}>
            <Heading size={1} lineHeight={3} textColor="orange">Demo Time</Heading>
          </Typeface>
          <Text textColor="textBlue"><b>https://github.com/shrynx</b></Text>
        </Slide>
        <Slide id="conslusion" transition={["slide"]} bgColor="secondry">
          <Appear fid="1">
            <Heading size={5} textColor="textBlue" margin={50}>React <span style={{color: "#000"}}>- A <i>declarative</i> library for managing views</span></Heading>
          </Appear>
          <Appear fid="2">
            <Heading size={5} textColor="textPurple" margin={50}>Redux  <span style={{color: "#000"}}>- A <i>declarative functional</i> library for managing state</span></Heading>
          </Appear>
          <Appear fid="3">
            <Heading size={5} textColor="textPink" margin={50}>Redux-observable  <span style={{color: "#000"}}>- A <i>declarative functional reactive</i> library for managing side effects/ orchestrating actions</span></Heading>
          </Appear>
        </Slide>
        {/* Slide */}
        <Slide id="thank-you" transition={["slide"]} bgColor="primary"
          notes="
            <ul>
              <li>
                thank you
              </li>
              <li>if you have any doubts questions, which i surely assume you would be having</li>
              <li>i had too less time and too many things</li>
              <li>i will be stuicking around for a while here, free feel to ask me anything</li>
            </ul>
          " >
          <Heading size={3} lineHeight={2} textColor="secondry">
            Thank you !
          </Heading>
        </Slide>
        {/* Slide */}
      </Deck>
    );
  }
}
