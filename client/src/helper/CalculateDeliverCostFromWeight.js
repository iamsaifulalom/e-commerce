export default function CalculateDeliverCostFromWeight(kg) {

    if (kg <= 5) {
        return 30;
    } else if (kg <= 10) {
        return 40;
    } else if (kg <= 20) {
        return 60;
    } else if (kg <= 30) {
        return 80;
    } else if (kg <= 50) {
        return 100;
    } else {
        return 120;
    }
}
