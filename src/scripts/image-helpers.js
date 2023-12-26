import AceClubs from '../assets/images/ace_of_clubs.png';
import AceDiamonds from '../assets/images/ace_of_diamonds.png';
import AceHearts from '../assets/images/ace_of_hearts.png';
import AceSpades from '../assets/images/ace_of_spades.png';
import EightClubs from '../assets/images/eight_of_clubs.png';
import EightDiamonds from '../assets/images/eight_of_diamonds.png';
import EightHearts from '../assets/images/eight_of_hearts.png';
import EightSpades from '../assets/images/eight_of_spades.png';
import FiveClubs from '../assets/images/five_of_clubs.png';
import FiveDiamonds from '../assets/images/five_of_diamonds.png';
import FiveHearts from '../assets/images/five_of_hearts.png';
import FiveSpades from '../assets/images/five_of_spades.png';
import FourClubs from '../assets/images/four_of_clubs.png';
import FourDiamonds from '../assets/images/four_of_diamonds.png';
import FourHearts from '../assets/images/four_of_hearts.png';
import FourSpades from '../assets/images/four_of_spades.png';
import JackClubs from '../assets/images/jack_of_clubs.png';
import JackDiamonds from '../assets/images/jack_of_diamonds.png';
import JackHearts from '../assets/images/jack_of_hearts.png';
import JackSpades from '../assets/images/jack_of_spades.png';
import KingClubs from '../assets/images/king_of_clubs.png';
import KingDiamonds from '../assets/images/king_of_diamonds.png';
import KingHearts from '../assets/images/king_of_hearts.png';
import KingSpades from '../assets/images/king_of_spades.png';
import NineClubs from '../assets/images/nine_of_clubs.png';
import NineDiamonds from '../assets/images/nine_of_diamonds.png';
import NineHearts from '../assets/images/nine_of_hearts.png';
import NineSpades from '../assets/images/nine_of_spades.png';
import QueenClubs from '../assets/images/queen_of_clubs.png';
import QueenDiamonds from '../assets/images/queen_of_diamonds.png';
import QueenHearts from '../assets/images/queen_of_hearts.png';
import QueenSpades from '../assets/images/queen_of_spades.png';
import SevenClubs from '../assets/images/seven_of_clubs.png';
import SevenDiamonds from '../assets/images/seven_of_diamonds.png';
import SevenHearts from '../assets/images/seven_of_hearts.png';
import SevenSpades from '../assets/images/seven_of_spades.png';
import SixClubs from '../assets/images/six_of_clubs.png';
import SixDiamonds from '../assets/images/six_of_diamonds.png';
import SixHearts from '../assets/images/six_of_hearts.png';
import SixSpades from '../assets/images/six_of_spades.png';
import TenClubs from '../assets/images/ten_of_clubs.png';
import TenDiamonds from '../assets/images/ten_of_diamonds.png';
import TenHearts from '../assets/images/ten_of_hearts.png';
import TenSpades from '../assets/images/ten_of_spades.png';
import ThreeClubs from '../assets/images/three_of_clubs.png';
import ThreeDiamonds from '../assets/images/three_of_diamonds.png';
import ThreeHearts from '../assets/images/three_of_hearts.png';
import ThreeSpades from '../assets/images/three_of_spades.png';
import TwoClubs from '../assets/images/two_of_clubs.png';
import TwoDiamonds from '../assets/images/two_of_diamonds.png';
import TwoHearts from '../assets/images/two_of_hearts.png';
import TwoSpades from '../assets/images/two_of_spades.png';

const getImgSrc = (id) => {
  // eslint-disable-next-line sonarjs/max-switch-cases
  switch (id) {
    case 'two_of_clubs-img': {
      return TwoClubs;
    }
    case 'three_of_clubs-img': {
      return ThreeClubs;
    }
    case 'four_of_clubs-img': {
      return FourClubs;
    }
    case 'five_of_clubs-img': {
      return FiveClubs;
    }
    case 'six_of_clubs-img': {
      return SixClubs;
    }
    case 'seven_of_clubs-img': {
      return SevenClubs;
    }
    case 'eight_of_clubs-img': {
      return EightClubs;
    }
    case 'nine_of_clubs-img': {
      return NineClubs;
    }
    case 'ten_of_clubs-img': {
      return TenClubs;
    }
    case 'jack_of_clubs-img': {
      return JackClubs;
    }
    case 'queen_of_clubs-img': {
      return QueenClubs;
    }
    case 'king_of_clubs-img': {
      return KingClubs;
    }
    case 'ace_of_clubs-img': {
      return AceClubs;
    }
    case 'two_of_diamonds-img': {
      return TwoDiamonds;
    }
    case 'three_of_diamonds-img': {
      return ThreeDiamonds;
    }
    case 'four_of_diamonds-img': {
      return FourDiamonds;
    }
    case 'five_of_diamonds-img': {
      return FiveDiamonds;
    }
    case 'six_of_diamonds-img': {
      return SixDiamonds;
    }
    case 'seven_of_diamonds-img': {
      return SevenDiamonds;
    }
    case 'eight_of_diamonds-img': {
      return EightDiamonds;
    }
    case 'nine_of_diamonds-img': {
      return NineDiamonds;
    }
    case 'ten_of_diamonds-img': {
      return TenDiamonds;
    }
    case 'jack_of_diamonds-img': {
      return JackDiamonds;
    }
    case 'queen_of_diamonds-img': {
      return QueenDiamonds;
    }
    case 'king_of_diamonds-img': {
      return KingDiamonds;
    }
    case 'ace_of_diamonds-img': {
      return AceDiamonds;
    }
    case 'two_of_hearts-img': {
      return TwoHearts;
    }
    case 'three_of_hearts-img': {
      return ThreeHearts;
    }
    case 'four_of_hearts-img': {
      return FourHearts;
    }
    case 'five_of_hearts-img': {
      return FiveHearts;
    }
    case 'six_of_hearts-img': {
      return SixHearts;
    }
    case 'seven_of_hearts-img': {
      return SevenHearts;
    }
    case 'eight_of_hearts-img': {
      return EightHearts;
    }
    case 'nine_of_hearts-img': {
      return NineHearts;
    }
    case 'ten_of_hearts-img': {
      return TenHearts;
    }
    case 'jack_of_hearts-img': {
      return JackHearts;
    }
    case 'queen_of_hearts-img': {
      return QueenHearts;
    }
    case 'king_of_hearts-img': {
      return KingHearts;
    }
    case 'ace_of_hearts-img': {
      return AceHearts;
    }
    case 'two_of_spades-img': {
      return TwoSpades;
    }
    case 'three_of_spades-img': {
      return ThreeSpades;
    }
    case 'four_of_spades-img': {
      return FourSpades;
    }
    case 'five_of_spades-img': {
      return FiveSpades;
    }
    case 'six_of_spades-img': {
      return SixSpades;
    }
    case 'seven_of_spades-img': {
      return SevenSpades;
    }
    case 'eight_of_spades-img': {
      return EightSpades;
    }
    case 'nine_of_spades-img': {
      return NineSpades;
    }
    case 'ten_of_spades-img': {
      return TenSpades;
    }
    case 'jack_of_spades-img': {
      return JackSpades;
    }
    case 'queen_of_spades-img': {
      return QueenSpades;
    }
    case 'king_of_spades-img': {
      return KingSpades;
    }
    case 'ace_of_spades-img': {
      return AceSpades;
    }
    default: {
      return;
    }
  }
};

export { getImgSrc };
