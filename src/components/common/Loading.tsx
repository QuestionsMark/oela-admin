interface Props {
    className?: string;
}

export const Loading = ({ className }: Props) => {
    return (
        <div className={`loading${className ? ' ' + className : ''}`}>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    );
};