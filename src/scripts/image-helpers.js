import TwoClubs from '../assets/images/2_of_clubs.png';
import TwoDiamonds from '../assets/images/2_of_diamonds.png';
import TwoHearts from '../assets/images/2_of_hearts.png';
import TwoSpades from '../assets/images/2_of_spades.png';
import ThreeClubs from '../assets/images/3_of_clubs.png';
import ThreeDiamonds from '../assets/images/3_of_diamonds.png';
import ThreeHearts from '../assets/images/3_of_hearts.png';
import ThreeSpades from '../assets/images/3_of_spades.png';
import FourClubs from '../assets/images/4_of_clubs.png';
import FourDiamonds from '../assets/images/4_of_diamonds.png';
import FourHearts from '../assets/images/4_of_hearts.png';
import FourSpades from '../assets/images/4_of_spades.png';
import FiveClubs from '../assets/images/5_of_clubs.png';
import FiveDiamonds from '../assets/images/5_of_diamonds.png';
import FiveHearts from '../assets/images/5_of_hearts.png';
import FiveSpades from '../assets/images/5_of_spades.png';
import SixClubs from '../assets/images/6_of_clubs.png';
import SixDiamonds from '../assets/images/6_of_diamonds.png';
import SixHearts from '../assets/images/6_of_hearts.png';
import SixSpades from '../assets/images/6_of_spades.png';
import SevenClubs from '../assets/images/7_of_clubs.png';
import SevenDiamonds from '../assets/images/7_of_diamonds.png';
import SevenHearts from '../assets/images/7_of_hearts.png';
import SevenSpades from '../assets/images/7_of_spades.png';
import EightClubs from '../assets/images/8_of_clubs.png';
import EightDiamonds from '../assets/images/8_of_diamonds.png';
import EightHearts from '../assets/images/8_of_hearts.png';
import EightSpades from '../assets/images/8_of_spades.png';
import NineClubs from '../assets/images/9_of_clubs.png';
import NineDiamonds from '../assets/images/9_of_diamonds.png';
import NineHearts from '../assets/images/9_of_hearts.png';
import NineSpades from '../assets/images/9_of_spades.png';
import TenClubs from '../assets/images/10_of_clubs.png';
import TenDiamonds from '../assets/images/10_of_diamonds.png';
import TenHearts from '../assets/images/10_of_hearts.png';
import TenSpades from '../assets/images/10_of_spades.png';
import AceClubs from '../assets/images/ace_of_clubs.png';
import AceDiamonds from '../assets/images/ace_of_diamonds.png';
import AceHearts from '../assets/images/ace_of_hearts.png';
import AceSpades from '../assets/images/ace_of_spades.png';
import CardBack from '../assets/images/card-back.png';
import JackClubs from '../assets/images/jack_of_clubs.png';
import JackDiamonds from '../assets/images/jack_of_diamonds.png';
import JackHearts from '../assets/images/jack_of_hearts.png';
import JackSpades from '../assets/images/jack_of_spades.png';
import KingClubs from '../assets/images/king_of_clubs.png';
import KingDiamonds from '../assets/images/king_of_diamonds.png';
import KingHearts from '../assets/images/king_of_hearts.png';
import KingSpades from '../assets/images/king_of_spades.png';
import QueenClubs from '../assets/images/queen_of_clubs.png';
import QueenDiamonds from '../assets/images/queen_of_diamonds.png';
import QueenHearts from '../assets/images/queen_of_hearts.png';
import QueenSpades from '../assets/images/queen_of_spades.png';

const getImgs = (id) => {
  const imgId = `${id}-img`;
  const imgSrc = getImgSrc(id);
  const backSrc = CardBack;
  return { imgId, imgSrc, backSrc };
};

const getImgSrc = (id) => {
  switch (id) {
    case '2_of_clubs': {
      return TwoClubs;
    }
    case '3_of_clubs': {
      return ThreeClubs;
    }
    case '4_of_clubs': {
      return FourClubs;
    }
    case '5_of_clubs': {
      return FiveClubs;
    }
    case '6_of_clubs': {
      return SixClubs;
    }
    case '7_of_clubs': {
      return SevenClubs;
    }
    case '8_of_clubs': {
      return EightClubs;
    }
    case '9_of_clubs': {
      return NineClubs;
    }
    case '10_of_clubs': {
      return TenClubs;
    }
    case 'jack_of_clubs': {
      return JackClubs;
    }
    case 'queen_of_clubs': {
      return QueenClubs;
    }
    case 'king_of_clubs': {
      return KingClubs;
    }
    case 'ace_of_clubs': {
      return AceClubs;
    }
    case '2_of_diamonds': {
      return TwoDiamonds;
    }
    case '3_of_diamonds': {
      return ThreeDiamonds;
    }
    case '4_of_diamonds': {
      return FourDiamonds;
    }
    case '5_of_diamonds': {
      return FiveDiamonds;
    }
    case '6_of_diamonds': {
      return SixDiamonds;
    }
    case '7_of_diamonds': {
      return SevenDiamonds;
    }
    case '8_of_diamonds': {
      return EightDiamonds;
    }
    case '9_of_diamonds': {
      return NineDiamonds;
    }
    case '10_of_diamonds': {
      return TenDiamonds;
    }
    case 'jack_of_diamonds': {
      return JackDiamonds;
    }
    case 'queen_of_diamonds': {
      return QueenDiamonds;
    }
    case 'king_of_diamonds': {
      return KingDiamonds;
    }
    case 'ace_of_diamonds': {
      return AceDiamonds;
    }
    case '2_of_hearts': {
      return TwoHearts;
    }
    case '3_of_hearts': {
      return ThreeHearts;
    }
    case '4_of_hearts': {
      return FourHearts;
    }
    case '5_of_hearts': {
      return FiveHearts;
    }
    case '6_of_hearts': {
      return SixHearts;
    }
    case '7_of_hearts': {
      return SevenHearts;
    }
    case '8_of_hearts': {
      return EightHearts;
    }
    case '9_of_hearts': {
      return NineHearts;
    }
    case '10_of_hearts': {
      return TenHearts;
    }
    case 'jack_of_hearts': {
      return JackHearts;
    }
    case 'queen_of_hearts': {
      return QueenHearts;
    }
    case 'king_of_hearts': {
      return KingHearts;
    }
    case 'ace_of_hearts': {
      return AceHearts;
    }
    case '2_of_spades': {
      return TwoSpades;
    }
    case '3_of_spades': {
      return ThreeSpades;
    }
    case '4_of_spades': {
      return FourSpades;
    }
    case '5_of_spades': {
      return FiveSpades;
    }
    case '6_of_spades': {
      return SixSpades;
    }
    case '7_of_spades': {
      return SevenSpades;
    }
    case '8_of_spades': {
      return EightSpades;
    }
    case '9_of_spades': {
      return NineSpades;
    }
    case '10_of_spades': {
      return TenSpades;
    }
    case 'jack_of_spades': {
      return JackSpades;
    }
    case 'queen_of_spades': {
      return QueenSpades;
    }
    case 'king_of_spades': {
      return KingSpades;
    }
    case 'ace_of_spades': {
      return AceSpades;
    }
    default: {
      return;
    }
  }
};

export { getImgs };
