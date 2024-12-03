import { ChevronRight } from "lucide-react";

type BaseCardProps = {
    title: string;
    colorClass?: string;
};

type SpaceCardProps = BaseCardProps & {
    variant: "space";
    icon?: string;
    description?: string;
    showChevron?: boolean;
};

type AccountCardProps = BaseCardProps & {
    variant: "account";
    icon?: string;
    accountNumber?: string;
    balance: string;
};

type CardProps = SpaceCardProps | AccountCardProps;

const Card = (props: CardProps) => {
    if (props.variant === "account") {
        return (
            <div className="flex items-center gap-4 p-4 bg-white rounded-md shadow-sm">
                <div className="flex-1">
                    <div className="flex items-center gap-4">
                        {props.icon && (
                            <div
                                className={`w-12 h-12 ${props.colorClass} rounded-full flex items-center justify-center`}
                            >
                                {props.icon}
                            </div>
                        )}
                        <div>
                            <h2 className="text-black font-medium">
                                {props.title}
                            </h2>
                            <p className="text-gray-text text-sm">
                                {props.accountNumber}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-black text-lg font-medium">
                        {props.balance}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-md shadow-sm">
            <div
                className={`w-12 h-12 ${props.colorClass} rounded-full flex items-center justify-center`}
            >
                {props.icon}
            </div>
            <div className="flex-1">
                <h2 className="text-black font-medium">{props.title}</h2>
                {props.description && (
                    <p className="text-gray-text text-sm">
                        {props.description}
                    </p>
                )}
            </div>
            {props.showChevron && (
                <ChevronRight className="text-gray-text" size={20} />
            )}
        </div>
    );
};

export default Card;
